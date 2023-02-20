package com.idle.imfine.service.paper.impl;


import com.idle.imfine.data.dto.comment.response.ResponseCommentDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.image.ResponseModifyImageDto;
import com.idle.imfine.data.dto.image.UploadFile;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponseMainPage;
import com.idle.imfine.data.dto.paper.response.ResponseModifyPaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDtoOnlyMainPage;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDtoOnlyMainPage;
import com.idle.imfine.data.dto.symptom.response.ResponsePaperHasSymptomDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.image.Image;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import com.idle.imfine.data.repository.comment.CommentRepository;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.image.ImageRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.symptom.DiaryHasSymptomRepository;
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.errors.code.DiaryErrorCode;
import com.idle.imfine.errors.code.PaperErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.FileStore;
import com.idle.imfine.service.paper.PaperService;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.idle.imfine.service.sentiment.SentimentAnalysis;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PaperServiceImpl implements PaperService {
    private final PaperRepository paperRepository;
    private final DiaryRepository diaryRepository;
    private final DiaryHasSymptomRepository diaryHasSymptomRepository;
    private final PaperHasSymptomRepository paperHasSymptomRepository;
    private final ImageRepository imageRepository;
    private final CommentRepository commentRepository;
    private final HeartRepository heartRepository;
    private final ConditionRepository conditionRepository;
    private final SymptomRepository symptomRepository;
    private final Common common;
    private final FileStore fileStore;
    private final SentimentAnalysis sentimentAnalysis;

    static final Logger LOGGER = LoggerFactory.getLogger(PaperServiceImpl.class);

    @Override
    @Transactional
    public long save(RequestPaperPostDto requestPaperPostDto, String uid) throws IOException {
        User user = common.getUserByUid(uid);

        ///// 에러처리 똑바로 하기
        Diary diary = diaryRepository.findById(requestPaperPostDto.getDiaryId())
                .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));


        LOGGER.info("[PaperService.save] date : {} requestDate{}",  requestPaperPostDto.getDiaryId(), requestPaperPostDto.getDate());
        LocalDate date = common.convertDateType(requestPaperPostDto.getDate());
        Optional<Paper> exist = paperRepository.getByDiary_IdAndDate(diary.getId(), date);

        if (exist.isPresent()) {
            throw new ErrorException(PaperErrorCode.PAPER_DUPLICATE_DATE);
        }
        if (user.getId() != diary.getWriter().getId()) {
            throw new ErrorException(PaperErrorCode.PAPER_NOT_AUTHORIZED);
        }
        Paper savedPaper = paperRepository.save(Paper.builder()
                .diary(diary)
                .content(requestPaperPostDto.getContents())
                .open(requestPaperPostDto.isOpen())
                .date(date)
                .build());

        LOGGER.info("[PaperService.save] 감정 분석 > 비동기 처리");
        sentimentAnalysis.analyzeText(savedPaper);

        LOGGER.info("[PaperService.save] 이미지 업로드.......");
        List<UploadFile> storeImageFiles;
        storeImageFiles = fileStore.storeFiles(requestPaperPostDto.getImages());
        LOGGER.info("[PaperService.save] diary update.......");
//        diary.paperAdd();
        diary.setPaperCount(diary.getPaperCount() + 1);
        diary.setPostedAt(LocalDateTime.now());

        LOGGER.info("[PaperService.save] image name 테이블 저장.......");
        List<Image> saveImage = storeImageFiles.stream().map(
                path ->  Image.builder()
                        .paperId(savedPaper.getId())
                        .path(path.getStoreFileName())
                        .build()
        ).collect(Collectors.toList());
        if (saveImage.size() != 0){
            LOGGER.info("[PaperService.save] image 존재하지 않음");
            imageRepository.saveAll(saveImage);
        }
//        LOGGER.info("[PaperService.save] 증상 저장");
        if (requestPaperPostDto.getSymptoms().size() != 0) {
            LOGGER.info("[PaperService.save] 증상 존재, 증상기록 저장");
            Stream<PaperHasSymptom> savePaperSymptom = requestPaperPostDto.getSymptoms().stream().map(
                symptomRecord -> PaperHasSymptom.builder()
                        .symptomId(symptomRecord.getSymptomId())
                        .score(symptomRecord.getScore())
                        .paper(savedPaper)
                        .build()
                );
            paperHasSymptomRepository.saveAll(savePaperSymptom.collect(Collectors.toList()));
        }
        diary.setPaperCount(diary.getPaperCount() + 1);
        LOGGER.info("[PaperService.save] 일기 저장 종료");
        return savedPaper.getId();
    }

    @Transactional
    @Override
    public void delete(long paperId, String uid) {
        LOGGER.info("[PaperService.delete] 일기 삭제 service");
        common.getUserByUid(uid);

        Paper foundPaper = paperRepository.findByIdFetchAll(paperId)
            .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        Diary paperDiary = foundPaper.getDiary();
        paperDiary.setPaperCount(paperDiary.getPaperCount() - 1);

        LOGGER.info("[PaperService.delete] 일기 삭제 service");
        if (!foundPaper.getComments().isEmpty()) {
            LOGGER.info("[PaperService.delete] 일기 댓글관련 삭제1");
            List<Comment> comments = paperRepository.findByIdFetchComments(foundPaper.getId());
            LOGGER.info("[PaperService.delete] 일기 댓글관련 삭제2");
            heartRepository.deleteByContentsCodeIdAndContentsId(
                    3, comments.stream().map(Comment::getId).collect(Collectors.toList()));
            LOGGER.info("[PaperService.delete] 일기 댓글관련 삭제3");
            commentRepository.deleteByCommentIds(foundPaper.getId());
        }

        heartRepository.deleteHeartsByContentsCodeIdAndContentsId(2, foundPaper.getId());
        paperHasSymptomRepository.deleteByPaper(foundPaper.getId());
        paperRepository.deleteById(paperId);

        LOGGER.info("[PaperService.delete] 일기 삭제 종료");
    }

    @Override
    @Transactional
    public List<String> modifyPaper(RequestPaperPutDto requestPaperPutDto, String uid)
            throws IOException {
        LOGGER.info("[PaperService.modifyPaper] 일기 수정 service");
        common.getUserByUid(uid);

        Paper paper = paperRepository.findByIdFetchPaperSymptom(requestPaperPutDto.getPaperId())
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        paper.setContent(requestPaperPutDto.getContents());
        paper.setOpen(requestPaperPutDto.isOpen());

        LOGGER.info("[PaperService.modifyPaper] 감정 분석 >> 비동기 처리");
        sentimentAnalysis.analyzeText(paper);


        List<ResponseSymptomRecordDto> putSymptoms = requestPaperPutDto.getSymptomList();

        if (putSymptoms != null) {

            Map<Long, Integer> paperSymptomScoreByIds = new HashMap<>();
            List<Long> paperSymptomIds = new ArrayList<>();
            for (ResponseSymptomRecordDto putSymptom : putSymptoms) {
                if (putSymptom.getSymptomId() == null) {
                    PaperHasSymptom newPhs = PaperHasSymptom.builder()
                            .symptomId(putSymptom.getId())
                            .score(putSymptom.getScore())
                            .paper(paper)
                            .build();
                    paperHasSymptomRepository.save(newPhs);
                }
                paperSymptomScoreByIds.put(putSymptom.getSymptomId(), putSymptom.getScore());
                paperSymptomIds.add(putSymptom.getSymptomId());
            }

            List<PaperHasSymptom> symptoms = paperHasSymptomRepository.findByIdIn(paperSymptomIds);
            for (PaperHasSymptom phs : symptoms) {
                phs.setScore(paperSymptomScoreByIds.get(phs.getId()));
            }
        }


        LOGGER.info("[PaperService.modifyPaper] 이미지 삭제 요청");
        List<Image> removeImage = imageRepository.findByIdIn(requestPaperPutDto.getRemoveImages());
        imageRepository.deleteByIdInJPQL(requestPaperPutDto.getRemoveImages());

        LOGGER.info("[PaperService.modifyPaper] 수정된 이미지 저장");
        List<UploadFile> storeImageFiles;
        storeImageFiles = fileStore.storeFiles(requestPaperPutDto.getPutImages());

        List<Image> saveImage = storeImageFiles.stream().map(
                path -> Image.builder()
                        .paperId(paper.getId())
                        .path(path.getStoreFileName())
                        .build()
        ).collect(Collectors.toList());
        if (saveImage.size() != 0) {
            imageRepository.saveAll(saveImage);
        }

        LOGGER.info("[PaperService.modifyPaper] 일기값 변경");
        paper.setContent(requestPaperPutDto.getContents());
        paper.setOpen(requestPaperPutDto.isOpen());

        LOGGER.info("[PaperService.modifyPaper] 일기 수정 종료");
        return removeImage.stream().map(
                Image::getPath
        ).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public ResponseNotificationPost postPaperLike(RequestHeartDto requestHeartDto, String uid) {
        LOGGER.info("[PaperService.postPaperLike]일기 좋아요 service");
        User user = common.getUserByUid(uid);
        Paper foundPaper = paperRepository.findById(requestHeartDto.getContentId())
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        if (heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
            requestHeartDto.getContentCodeId(), requestHeartDto.getContentId())) {
            throw new ErrorException(PaperErrorCode.PAPER_DUPLICATE_HEART);
        }

        LOGGER.info("[PaperService.postPaperLike] 좋아요 생성 및 저장");
        Heart heart = Heart.builder()
                .contentsCodeId(requestHeartDto.getContentCodeId())
                .contentsId(requestHeartDto.getContentId())
                .senderId(user.getId())
                .build();
        foundPaper.addLikeCount();
        paperRepository.save(foundPaper);
        heartRepository.save(heart);

        LOGGER.info("[PaperService.postPaperLike]일기 좋아요 종료");
        return new ResponseNotificationPost(user.getId(), foundPaper.getDiary().getWriter().getId(), 2, foundPaper.getId(), 31);
    }

    @Override
    @Transactional
    public void deletePaperLike(RequestHeartDto requestHeartDto, String uid) {
        LOGGER.info("[PaperService.deletePaperLike]일기 좋아요 삭제 service");
        User user = common.getUserByUid(uid);
        Paper foundPaper = paperRepository.findById(requestHeartDto.getContentId())
            .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        LOGGER.info("[PaperService.deletePaperLike] 삭제 동작");
        if (!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
            requestHeartDto.getContentCodeId(), requestHeartDto.getContentId())) {
            throw new ErrorException(PaperErrorCode.PAPER_NOT_FOUND_HEART);
        }
        heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
                requestHeartDto.getContentCodeId(), requestHeartDto.getContentId());

        foundPaper.delLikeCount();
        LOGGER.info("[PaperService.deletePaperLike]일기 좋아요 삭제 종료");
        paperRepository.save(foundPaper);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseMainPage getPaperList(String uid, Pageable pageable) {
        User user = common.getUserByUid(uid);
        LOGGER.info("[PaperService.getPaperList]메인페이지: 일기 목록 조회 service");

        Slice<Paper> papers = paperRepository.getMainPagePaperByHs(user.getId(), pageable);
        List<Paper> paperList = papers.getContent();
        Set<Long> myHeartPapers = paperRepository.findHeartPaperByUserIdAAndDiaryIn(user.getId(),
                paperList);
//        List<Condition> papersCondition = conditionRepository.findPaperConditionByPapersList(paperList);

        Map<Long, List<PaperHasSymptom>> map =
                paperHasSymptomRepository.findPaperHasSymptomByPaperInMap(
                    paperList).stream()
                    .collect(Collectors.groupingBy(o -> ((Long) o[0]),
                    Collectors.mapping(o -> (PaperHasSymptom) o[1], Collectors.toList())
        ));
        Set<Long> imageHasPaper = imageRepository.existsByPaperIds(paperList);
        List<Symptom> symptoms = symptomRepository.getSymptomByPapers(paperList);


        Map<Integer, Symptom> symptomIdByName =
                symptoms.stream().collect(Collectors.toMap(Symptom::getId, Function.identity()));

        LOGGER.info("[PaperService.getPaperList]메인페이지: 일기 목록 조회 종료");
        return ResponseMainPage.builder()
                .hasNext(papers.hasNext())
                .list(papers.stream().map(
                        paper -> {
                            Diary diary = paper.getDiary();
                            return ResponsePaperDtoOnlyMainPage.builder()
                                    .diaryId(diary.getId())
                                    .title(diary.getTitle())
                                    .content(paper.getContent())
                                    .paperId(paper.getId())
                                    .medicalName(diary.getMedicalCode().getName())
                                    .uid(diary.getWriter().getUid())
                                    .commentCount(paper.getCommentCount())
                                    .likeCount(paper.getLikeCount())
                                    .name(paper.getDiary().getWriter().getName())
                                    .myHeart(myHeartPapers.contains(paper.getId()))
                                    .date(paper.getDate())
                                    .createdAt(common.convertDateAllType(paper.getCreatedAt()))
                                    .open(paper.isOpen())
                                    .condition(common.getDateUserCondition(paper.getDate(), diary.getWriter()))
                                    .image(imageHasPaper.contains(paper.getId()))
                                    .hasNext(papers.hasNext())
                                    .symptomList(makeSymptomList(map, symptomIdByName, paper))
                                    .build();
                        }
                ).collect(Collectors.toList()))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ResponsePaperDetailDto getPaperDetail(long paperId, String uid) {
        LOGGER.info("[PaperService.getPaperDetail]일기 상세 service");
        User user = common.getUserByUid(uid);
        // 에러처리 똑바로 하기
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));
        Diary paperDiary = paper.getDiary();
        if (!paper.isOpen() && user.getId() != paper.getDiary().getWriter().getId()) {
            throw new ErrorException(PaperErrorCode.PAPER_NOT_AUTHORIZED);
        }

        LOGGER.info("[PaperService.getPaperDetail]일기 상세 자료 조회");
        List<DiaryHasSymptom> diaryHasSymptoms = paperDiary.getDiaryHasSymptoms();
        List<PaperHasSymptom> paperHasSymptoms = paper.getPaperHasSymptoms();

        List<ResponsePaperSymptomRecordDto> responsePaperSymptomRecords =
                getPaperSymptomRecords(diaryHasSymptoms, paperHasSymptoms);

        List<Comment> myHeartComment =
                commentRepository.findCommentByHeartAndPaperIn(paper.getId(), 3, user);

        List<Comment> paperComments =
                commentRepository.findCommentsByFetchWriterAndPaperId(paperId);

//        List<Long> commentsUsers =
//                paperComments.stream().map(Comment::getId).collect(Collectors.toList());

//        List<Condition> commentConditions =
//                conditionRepository.findConditionsByDateAndUserIn(LocalDate.now(), commentsUsers);
//        Map<Long, Integer> commentConditionsByMap = new HashMap<>();
//
//        for (Condition condition : commentConditions) {
//            commentConditionsByMap.put(condition.getUser().getId(), condition.getCondition());
//        }

        LOGGER.info("[PaperService.getPaperDetail]일기 상세 댓글 조회");
        List<ResponseCommentDto> comments = paperComments.stream().map(
                comment -> {
                    User writer = comment.getWriter();

                    return ResponseCommentDto.builder()
                            .commentId(comment.getId())
                            .userId(writer.getId())
                            .uid(writer.getUid())
                            .name(writer.getName())
                            .likeCount(comment.getLikeCount())
                            .declarationCount(comment.getDeclarationCount())
                            .content(comment.getContent())
                            .myHeart(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 3, comment.getId()))
                            .createdAt(common.convertDateAllType(comment.getCreatedAt()))
                            .userStatus(comment.getWriter().getId() == user.getId() ? 0 : 1)
                            .condition(common.getDateUserCondition(comment.getCreatedAt().toLocalDate(), writer))
                            .build();
                }
        ).collect(Collectors.toList());

        int sentiment = paper.getSentiment();
        LOGGER.info("[PaperService.getPaperDetail] Sentiment: {}", sentiment);
        String musicURL = null;

        if (sentiment != -1) {
            musicURL = sentimentAnalysis.getMusic(sentiment);
        }
        LOGGER.info("[PaperService.getPaperDetail] Music URL: {}", musicURL);

        LOGGER.info("[PaperService.getPaperDetail]일기 상세 종료");

        User writer = paper.getDiary().getWriter();
        return ResponsePaperDetailDto.builder()
                .diaryId(paperDiary.getId())
                .title(paperDiary.getTitle())
                .uid(writer.getUid())
                .userStatus(user.getId() == paperDiary.getWriter().getId() ? 0 : 1)
                .name(writer.getName())
                .content(paper.getContent())
                .likeCount(paper.getLikeCount())
                .commentCount(paper.getCommentCount())
                .createdAt(common.convertDateAllType(paper.getCreatedAt()))
                .date(String.valueOf(paper.getDate()))
                .condition(common.getDateUserCondition(paper.getDate(), writer))
                .symptomList(responsePaperSymptomRecords)
                .images(paper.getImages().stream().map(
                        Image::getPath
                ).collect(Collectors.toList()))
                .myHeart(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(
                        user.getId(), 2, paper.getId()))
                .comments(comments)
                .musicURL(musicURL)
                .play(user.isPlay())
                .build();

    }

    private List<ResponsePaperSymptomRecordDto> getPaperSymptomRecords(
            List<DiaryHasSymptom> diaryHasSymptoms, List<PaperHasSymptom> paperHasSymptoms) {

        List<ResponsePaperSymptomRecordDto> responsePaperSymptomRecords = new ArrayList<>();
        for (DiaryHasSymptom dhs : diaryHasSymptoms) {
            for (PaperHasSymptom paperHasSymptom : paperHasSymptoms) {
                if (paperHasSymptom.getSymptomId() == dhs.getSymptom().getId()) {
                    responsePaperSymptomRecords.add(ResponsePaperSymptomRecordDto.builder()
                            .id(paperHasSymptom.getSymptomId())
                            .name(dhs.getSymptom().getName())
                            .score(paperHasSymptom.getScore())
                            .build());
                    break;
                }
            }
        }
        return responsePaperSymptomRecords;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponsePaperDto> getAllPaperByDate(String uid, String date) {
        LOGGER.info("[PaperService.getAllPaperByDate] 일기 오늘의 일기 service");

        User user = common.getUserByUid(uid);
        List<Diary> diaries = diaryRepository.findAllByWriter(user);

        List<Paper> papers = paperRepository.findAllByDiaryInAndDateAndOpenTrueJPQL(diaries,
                common.convertDateType(date), user);
        LOGGER.info("[PaperService.getAllPaperByDate] 일기 오늘의 종료");
        return papers.stream().map(
                paper -> ResponsePaperDto.builder()
                        .diaryId(paper.getDiary().getId())
                        .title(paper.getDiary().getTitle())
                        .content(paper.getContent())
                        .paperId(paper.getId())
                        .uid(paper.getDiary().getWriter().getUid())
                        .commentCount(paper.getCommentCount())
                        .likeCount(paper.getLikeCount())
                        .date(paper.getDate())
                        .createdAt(common.convertDateAllType(paper.getCreatedAt()))
                        .open(paper.isOpen())
                        .condition(common.getDateUserCondition(paper.getDate(), paper.getDiary()
                                .getWriter()))
                        .image(!imageRepository.findByPaperId(paper).isEmpty())
                        .myHeart(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 2, paper.getId()))
                        .symptomList(makeSymptomListByPaper(paper))
                        .build()
        ).collect(Collectors.toList());
    }

    private List<ResponsePaperSymptomRecordDto> makeSymptomListByPaper(Paper paper) {

        return paper.getPaperHasSymptoms().stream().map(
        paperHasSymptom -> {
            ResponsePaperSymptomRecordDto element = null;
            for (DiaryHasSymptom diaryHasSymptom: paper.getDiary().getDiaryHasSymptoms()) {
                if (paperHasSymptom.getSymptomId() != diaryHasSymptom.getSymptom().getId()) {
                    continue;
                }
                element = ResponsePaperSymptomRecordDto.builder()
                    .name(diaryHasSymptom.getSymptom().getName())
                    .score(paperHasSymptom.getScore())
                    .id(paperHasSymptom.getSymptomId())
                    .build();
                break;
            }
            return element;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseModifyPaperDto getModifyPaper(String uid, long paperId) {
        LOGGER.info("[PaperService.getModifyPaper] 일기장 수정 정보 service");

        User user = common.getUserByUid(uid);
        Paper paper = paperRepository.findPaperByPaperIdJoinDiary(paperId)
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        if (paper.getDiary().getWriter().getId() != user.getId()) {
            throw new ErrorException(PaperErrorCode.PAPER_NOT_AUTHORIZED);
        }

        List<Image> images = imageRepository.findByPaperId(paper);
        List<PaperHasSymptom> symptoms = paperHasSymptomRepository.findByPaper(paper);
        List<Symptom> symptomList = diaryHasSymptomRepository.findByDiaryToMap(paper.getDiary());

        Map<Integer, PaperHasSymptom> symptomById = new HashMap<>();
        symptoms.forEach(
                symptom -> {
                    LOGGER.info("이번 증상의 번호는? {}", symptom.getSymptomId());
                    symptomById.put(symptom.getSymptomId(), symptom);
                }
        );

        LOGGER.info("[PaperService.getModifyPaper] 이미지 정보 가져옴");
        List<ResponseModifyImageDto> responseImage = images.stream().map(
                image -> ResponseModifyImageDto.builder()
                        .id(image.getId())
                        .image(image.getPath())
                        .build()
        ).collect(Collectors.toList());

        List<ResponsePaperHasSymptomDto> responseSymptoms = symptomList.stream().map(
                symptom ->{
                    boolean phs = symptomById.containsKey(symptom.getId());
                    return ResponsePaperHasSymptomDto.builder()
                        .id(symptom.getId())
                        .symptomId(phs ? symptomById.get(symptom.getId()).getId() : 0)
                        .score(phs ? symptomById.get(symptom.getId()).getScore() : 0)
                        .symptomName(symptom.getName())
                        .score(phs ? symptomById.get(symptom.getId()).getScore() : 0)
                        .build();
                }
        ).collect(Collectors.toList());


        LOGGER.info("[PaperService.getModifyPaper] 일기장 수정 정보 종료");
        return ResponseModifyPaperDto.builder()
                .diaryId(paper.getDiary().getId())
                .title(paper.getDiary().getTitle())
                .paperId(paper.getId())
                .content(paper.getContent())
                .open(paper.isOpen())
                .date(paper.getDate().toString())
                .symptoms(responseSymptoms)
                .images(responseImage)
                .build();
    }

    public String findPaperCondition(Paper paper, List<Condition> papersCondition) {
        if (papersCondition.size() == 0) {
            return "0";
        }

        return String.valueOf(papersCondition.stream()
                .filter(condition -> condition.getDate() == paper.getDate()
                ).findFirst().orElseGet(Condition::new).getCondition());
    }

    private List<ResponsePaperSymptomRecordDtoOnlyMainPage> makeSymptomList(
            Map<Long, List<PaperHasSymptom>> map,
            Map<Integer, Symptom> symptomIdByName, Paper paper) {

        if (map.containsKey(paper.getId())) {
            List<PaperHasSymptom> paperHasSymptoms = map.get(paper.getId());
            return paperHasSymptoms.stream().map(paperHasSymptom ->
                    ResponsePaperSymptomRecordDtoOnlyMainPage.builder()
                            .symptomId(paperHasSymptom.getSymptomId())
                            .symptomName(
                                    symptomIdByName.get(paperHasSymptom.getSymptomId()).getName())
                            .score(paperHasSymptom.getScore())
                            .build()
            ).collect(Collectors.toList());

        } else {
            return new ArrayList<>();
        }
    }

}
