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
    public void save(RequestPaperPostDto requestPaperPostDto, String uid) throws IOException {
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
        if (foundPaper.getComments().isEmpty()) {
            heartRepository.deleteByCommentsId(foundPaper.getComments());
        }
        commentRepository.deleteByCommentIds(foundPaper.getId());
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

        List<Long> symptomIds = new ArrayList<>();
        Map<Long, Integer> symptomIdByScore = new HashMap<>();
        requestPaperPutDto.getSymptomList().forEach(
                responseSymptomRecordDto -> {
                    symptomIds.add(responseSymptomRecordDto.getSymptomId());
                    symptomIdByScore.put(responseSymptomRecordDto.getSymptomId(),
                            responseSymptomRecordDto.getScore());
                }
        );

        List<PaperHasSymptom> symptoms = paperHasSymptomRepository.findByIdIn(symptomIds);
        for (PaperHasSymptom phs : symptoms) {
            phs.setScore(symptomIdByScore.get(phs.getId()));
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
        List<Condition> papersCondition = conditionRepository.findPaperConditionByPapersList(paperList);

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
                        paper -> ResponsePaperDtoOnlyMainPage.builder()
                                .diaryId(paper.getDiary().getId())
                                .title(paper.getDiary().getTitle())
                                .content(paper.getContent())
                                .paperId(paper.getId())
                                .uid(paper.getDiary().getWriter().getUid())
                                .commentCount(paper.getCommentCount())
                                .likeCount(paper.getLikeCount())
                                .name(paper.getDiary().getWriter().getName())
                                .myHeart(myHeartPapers.contains(paper.getId()))
                                .date(paper.getDate())
                                .createdAt(common.convertDateAllType(paper.getCreatedAt()))
                                .open(paper.isOpen())
                                .condition(findPaperCondition(paper, papersCondition))
                                .image(imageHasPaper.contains(paper.getId()))
                                .hasNext(papers.hasNext())
                                .symptomList(makeSymptomList(map, symptomIdByName, paper))
                                .build()
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

        LOGGER.info("[PaperService.getPaperDetail]일기 상세 자료 조회");
        List<DiaryHasSymptom> diaryHasSymptoms = paperDiary.getDiaryHasSymptoms();
        List<PaperHasSymptom> paperHasSymptoms = paper.getPaperHasSymptoms();

        List<ResponsePaperSymptomRecordDto> responsePaperSymptomRecords =
                getPaperSymptomRecords(diaryHasSymptoms, paperHasSymptoms);

        List<Comment> myHeartComment =
                commentRepository.findCommentByHeartAndPaperIn(paper.getId(), 3, user);

        List<Comment> paperComments =
                commentRepository.findCommentsByFetchWriterAndPaperId(paperId);

        List<Long> commentsUsers =
                paperComments.stream().map(Comment::getId).collect(Collectors.toList());

        Map<Long, Integer> commentConditions =
                conditionRepository.findConditionsByDateAndUserIn(LocalDate.now(), commentsUsers);

        LOGGER.info("[PaperService.getPaperDetail]일기 상세 댓글 조회");
        List<ResponseCommentDto> comments = paperComments.stream().map(
                comment -> ResponseCommentDto.builder()
                        .commentId(comment.getId())
                        .userId(comment.getWriter().getId())
                        .uid(comment.getWriter().getUid())
                        .name(comment.getWriter().getName())
                        .likeCount(comment.getLikeCount())
                        .declarationCount(comment.getDeclarationCount())
                        .content(comment.getContent())
                        .myHeart(myHeartComment.stream().anyMatch(
                                heartComment -> heartComment.getId() == comment.getId()
                        ))
                        .createdAt(common.convertDateAllType(comment.getCreatedAt()))
                        .userStatus(comment.getWriter().getId() == user.getId() ? 0 : 1)
                        .condition(String.valueOf(commentConditions.getOrDefault(comment.getWriter().getId(), 0)))
                        .build()
        ).collect(Collectors.toList());

        int sentiment = paper.getSentiment();
        LOGGER.info("[PaperService.getPaperDetail] Sentiment: {}", sentiment);
        String musicURL = null;

        if (sentiment != -1) {
            musicURL = sentimentAnalysis.getMusic(sentiment);
        }
        LOGGER.info("[PaperService.getPaperDetail] Music URL: {}", musicURL);

        LOGGER.info("[PaperService.getPaperDetail]일기 상세 종료");
        return ResponsePaperDetailDto.builder()
                .diaryId(paperDiary.getId())
                .title(paperDiary.getTitle())
                .uid(paperDiary.getWriter().getUid())
                .userStatus(user.getId() == paperDiary.getWriter().getId() ? 0 : 1)
                .name(paperDiary.getWriter().getName())
                .content(paper.getContent())
                .likeCount(paper.getLikeCount())
                .commentCount(paper.getCommentCount())
                .createdAt(common.convertDateAllType(paper.getCreatedAt()))
                .condition(String.valueOf(
                        conditionRepository.findByUserAndDate(paperDiary.getWriter(), paper.getDate())
                                .orElseGet(Condition::new).getCondition()))
                .symptomList(responsePaperSymptomRecords)
                .images(paper.getImages().stream().map(
                        Image::getPath
                ).collect(Collectors.toList()))
                .myHeart(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(
                        user.getId(), 2, paper.getId()))
                .comments(comments)
                .musicURL(musicURL)
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

        List<Paper> papers = paperRepository.findAllByDiaryInAndDate(diaries,
                common.convertDateType(date));
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
                        .condition(String.format("%d",conditionRepository.findByUserAndDate(paper.getDiary()
                                .getWriter(), paper.getDate()).orElseGet(Condition::new).getCondition()))
                        .image(!imageRepository.findByPaperId(paper).isEmpty())
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
        List<Symptom> symptomByIdList = diaryHasSymptomRepository.findByDiaryToMap(paper.getDiary());

        Map<Integer, String> symptomById = new HashMap<>();
        symptomByIdList.forEach(
                symptom -> symptomById.put(symptom.getId(), symptom.getName())
        );

        LOGGER.info("[PaperService.getModifyPaper] 이미지 정보 가져옴");
        List<ResponseModifyImageDto> responseImage = images.stream().map(
                image -> ResponseModifyImageDto.builder()
                        .id(image.getId())
                        .image(image.getPath())
                        .build()
        ).collect(Collectors.toList());

        List<ResponsePaperHasSymptomDto> responsSymptoms = symptoms.stream().map(
                paperHasSymptom ->
                     ResponsePaperHasSymptomDto.builder()
                            .symptomId(paperHasSymptom.getId())
                            .symptomName(symptomById.get(paperHasSymptom.getSymptomId()))
                            .score(paperHasSymptom.getScore())
                            .build()
        ).collect(Collectors.toList());


        LOGGER.info("[PaperService.getModifyPaper] 일기장 수정 정보 종료");
        return ResponseModifyPaperDto.builder()
                .diaryId(paper.getDiary().getId())
                .title(paper.getDiary().getTitle())
                .paperId(paper.getId())
                .content(paper.getContent())
                .open(paper.isOpen())
                .date(paper.getDate().toString())
                .symptoms(responsSymptoms)
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
