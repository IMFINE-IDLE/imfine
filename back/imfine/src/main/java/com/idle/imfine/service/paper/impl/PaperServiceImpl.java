package com.idle.imfine.service.paper.impl;


import com.idle.imfine.data.dto.comment.response.ResponseCommentDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.image.UploadFile;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDtoOnlyMainPage;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDtoOnlyMainPage;
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
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.errors.code.DiaryErrorCode;
import com.idle.imfine.errors.code.PaperErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.FileStore;
import com.idle.imfine.service.notification.NotificationService;
import com.idle.imfine.service.paper.PaperService;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    private final PaperHasSymptomRepository paperHasSymptomRepository;
    private final ImageRepository imageRepository;
    private final CommentRepository commentRepository;
    private final HeartRepository heartRepository;
    private final ConditionRepository conditionRepository;
    private final SymptomRepository symptomRepository;
    private final Common common;
    private final FileStore fileStore;
    private final SentimentAnalysis sentimentAnalysis;
    private final NotificationService notificationService;

    static final Logger LOGGER = LoggerFactory.getLogger(PaperServiceImpl.class);

    @Override
    @Transactional
    public void save(RequestPaperPostDto requestPaperPostDto, String uid) throws IOException {
        User user = common.getUserByUid(uid);

        ///// 에러처리 똑바로 하기
        Diary diary = diaryRepository.findById(requestPaperPostDto.getDiaryId())
                .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));


        LOGGER.info("date : {} requestDate{}",  requestPaperPostDto.getDiaryId(), requestPaperPostDto.getDate());
        LocalDate date = common.convertDateType(requestPaperPostDto.getDate());
        Paper exist = paperRepository.getByDiary_IdAndDate(diary.getId(), date)
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_DUPLICATE_DATE));

        Paper savedPaper = paperRepository.save(Paper.builder()
                .diary(diary)
                .content(requestPaperPostDto.getContents())
                .open(requestPaperPostDto.isOpen())
                .date(date)
                .build());

        LOGGER.info("[PaperService.save] 감정 분석 > 비동기 처리");
        sentimentAnalysis.analyzeText(savedPaper);

        List<UploadFile> storeImageFiles;
        storeImageFiles = fileStore.storeFiles(requestPaperPostDto.getImages());
        diary.paperAdd();
        diary.setPostedAt(LocalDateTime.now());

        List<Image> saveImage = storeImageFiles.stream().map(
                path ->  Image.builder()
                        .paperId(savedPaper.getId())
                        .path(path.getStoreFileName())
                        .build()
        ).collect(Collectors.toList());
        if (saveImage.size() != 0){
            imageRepository.saveAll(saveImage);
        }
        Stream<PaperHasSymptom> savePaperSymptom = requestPaperPostDto.getSymptoms().stream().map(
            symptomRecord -> PaperHasSymptom.builder()
                    .symptomId(symptomRecord.getSymptomId())
                    .score(symptomRecord.getScore())
                    .paper(savedPaper)
                    .build()
            );

        paperHasSymptomRepository.saveAll(savePaperSymptom.collect(Collectors.toList()));
    }

    @Transactional
    @Override
    public void delete(long paperId, String uid) {
        LOGGER.info("일기 삭제 service");
        User user = common.getUserByUid(uid);
        Paper foundPaper = paperRepository.findById(paperId)
            .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));
        paperHasSymptomRepository.deleteByPaper(foundPaper.getId());
        paperRepository.deleteById(paperId);
    }

    @Override
    @Transactional
    public void modifyPaper(RequestPaperPutDto requestPaperPutDto, String uid) {
        LOGGER.info("일기 수정 service");
        User user = common.getUserByUid(uid);

        Paper paper = paperRepository.findById(requestPaperPutDto.getPaperId())
            .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        paper.setContent(requestPaperPutDto.getContents());
        paper.setOpen(requestPaperPutDto.isOpen());

        LOGGER.info("[PaperService.modifyPaper] 감정 분석 >> 비동기 처리");
        sentimentAnalysis.analyzeText(paper);

        List<PaperHasSymptom> symptoms = paper.getPaperHasSymptoms();
        for (PaperHasSymptom symptom : symptoms) {
            for (ResponseSymptomRecordDto putSymptom : requestPaperPutDto.getSymptomList()) {
                if (symptom.getSymptomId() == putSymptom.getSymptomId()) {
                    symptom.setScore(putSymptom.getScore());
                    break;
                }
            }
        }

    }

    @Transactional
    @Override
    public void postPaperLike(RequestHeartDto requestHeartDto, String uid) {
        LOGGER.info("일기 좋아요 service");
        User user = common.getUserByUid(uid);
        Paper foundPaper = paperRepository.findById(requestHeartDto.getContentId())
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        if (heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
            requestHeartDto.getContentCodeId(), requestHeartDto.getContentId())) {
            throw new ErrorException(PaperErrorCode.PAPER_DUPLICATE_HEART);
        }
        Heart heart = Heart.builder()
                .contentsCodeId(requestHeartDto.getContentCodeId())
                .contentsId(requestHeartDto.getContentId())
                .senderId(user.getId())
                .build();
        foundPaper.addLikeCount();
        paperRepository.save(foundPaper);
        heartRepository.save(heart);
        notificationService.send(user.getId(), foundPaper.getDiary().getWriter().getId(), 2, foundPaper.getId(), 3);
    }

    @Override
    @Transactional
    public void deletePaperLike(RequestHeartDto requestHeartDto, String uid) {
        LOGGER.info("일기 좋아요 삭제 service");
        User user = common.getUserByUid(uid);
        Paper foundPaper = paperRepository.findById(requestHeartDto.getContentId())
            .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));
        LOGGER.info("uid {}, contentcode {}, contentid {} 삭제 가능? {}", user.getId(), requestHeartDto.getContentCodeId()
            , requestHeartDto.getContentId(), heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
                requestHeartDto.getContentCodeId(), requestHeartDto.getContentId()));
        if (!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
            requestHeartDto.getContentCodeId(), requestHeartDto.getContentId())) {
            throw new ErrorException(PaperErrorCode.PAPER_NOT_FOUND_HEART);
        }
        heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
                requestHeartDto.getContentCodeId(), requestHeartDto.getContentId());

        foundPaper.delLikeCount();
        paperRepository.save(foundPaper);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponsePaperDtoOnlyMainPage> getPaperList(String uid, Pageable pageable) {
        User user = common.getUserByUid(uid);
        LOGGER.info("여긴가");

        Slice<Paper> papers = paperRepository.getMainPagePaperByHs(user.getId(), pageable);
        List<Paper> paperList = papers.getContent();
        Set<Long> myHeartPapers = paperRepository.findHeartPaperByUserIdAAndDiaryIn(user.getId(),
                paperList);
        Map<Long, Integer> papersCondition = conditionRepository.findPaperConditionByPapers(
                paperList);

        Map<Long, List<PaperHasSymptom>> map = paperHasSymptomRepository.findPaperHasSymptomByPaperInMap(paperList).stream().collect(Collectors.groupingBy(x -> (Long) x[0], Collectors.mapping(x ->  (PaperHasSymptom) x[1], Collectors.toList())));
        Set<Long> imageHasPaper = imageRepository.existsByPaperIds(paperList);
        List<Symptom> symptoms = symptomRepository.getSymptomByPapers(paperList);

        Map<Integer, Symptom> symptomIdByName = symptoms.stream().collect(Collectors.toMap(Symptom::getId, Function.identity()));

        return papers.stream().map(
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
                        .condition(papersCondition.get(paper.getId()) != null ? papersCondition.get(paper.getId()).toString() : "0")
                        .image(imageHasPaper.contains(paper.getId()))
                        .hasNext(papers.hasNext())
                        .symptomList(
                                map.get(paper.getId()).stream().map(
                                        paperHasSymptom ->
                                            ResponsePaperSymptomRecordDtoOnlyMainPage.builder()
                                                    .id(paperHasSymptom.getSymptomId())
                                                    .name(symptomIdByName.get(paperHasSymptom.getSymptomId()).getName())
                                                    .score(paperHasSymptom.getScore())
                                            .build()

                                ).collect(Collectors.toList()))
//                                paper.getPaperHasSymptoms().stream().map(
//                                        paperHasSymptom -> {
//                                            ResponsePaperSymptomRecordDto element = null;
//                                            for (DiaryHasSymptom diaryHasSymptom: paper.getDiary().getDiaryHasSymptoms()) {
//                                                if (paperHasSymptom.getSymptomId() == diaryHasSymptom.getSymptom().getId()) {
//                                                    element = ResponsePaperSymptomRecordDto.builder()
//                                                            .symptomName(diaryHasSymptom.getSymptom().getName())
//                                                            .score(paperHasSymptom.getScore())
//                                                            .symptomId(
//                                                                    paperHasSymptom.getSymptomId())
//                                                            .build();
//                                                    break;
//                                                }
//                                            }
//                                            return element;
//                                        }
//                                ).collect(Collectors.toList())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ResponsePaperDetailDto getPaperDetail(long paperId, String uid) {
        LOGGER.info("일기 상세 service");
        User user = common.getUserByUid(uid);

        // 에러처리 똑바로 하기
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));
        Diary paperDiary = paper.getDiary();

        List<DiaryHasSymptom> diaryHasSymptoms = paperDiary.getDiaryHasSymptoms();
        List<PaperHasSymptom> paperHasSymptoms = paper.getPaperHasSymptoms();
        List<ResponsePaperSymptomRecordDto> responsePaperSymptomRecordDtos = new ArrayList<>();
        for (DiaryHasSymptom diaryHasSymptom : diaryHasSymptoms) {
            for (PaperHasSymptom paperHasSymptom : paperHasSymptoms) {
                if (paperHasSymptom.getSymptomId() == diaryHasSymptom.getSymptom().getId()) {
                    responsePaperSymptomRecordDtos.add(ResponsePaperSymptomRecordDto.builder()
                            .symptomId(paperHasSymptom.getSymptomId())
                            .symptomName(diaryHasSymptom.getSymptom().getName())
                            .score(paperHasSymptom.getScore())
                            .build());
                    break;
                }
            }
        }
        List<Comment> myHeartComment = commentRepository.findCommentByHeartAndPaperIn(
                paper.getId(), 3,
                user);
        List<Comment> paperComments = commentRepository.findCommentsByFetchWriterAndPaperId(
                paperId);
        List<Long> commentsUsers = paperComments.stream().map(Comment::getId).collect(Collectors.toList());
        Map<Long, Integer> commentConditions = conditionRepository.findConditionsByDateAndUserIn(LocalDate.now(), commentsUsers);
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
                .symptomList(responsePaperSymptomRecordDtos)
                .images(paper.getImages().stream().map(
                        Image::getPath
                ).collect(Collectors.toList()))
                .myHeart(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(
                        user.getId(), 2, paper.getId()))
                .comments(comments)
                .musicURL(musicURL)
                .build();

    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponsePaperDto> getAllPaperByDate(String uid, String date) {
        LOGGER.info("일기 오늘의 일기 service");

        User user = common.getUserByUid(uid);
        List<Diary> diaries = diaryRepository.findAllByWriter(user);

        List<Paper> papers = paperRepository.findAllByDiaryInAndDate(diaries,
                common.convertDateType(date));
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
                        .image(imageRepository.existsByPaperId(paper))
                        .symptomList(
                                paper.getPaperHasSymptoms().stream().map(
                                        paperHasSymptom -> {
                                            ResponsePaperSymptomRecordDto element = null;
                                            for (DiaryHasSymptom diaryHasSymptom: paper.getDiary().getDiaryHasSymptoms()) {
                                                if (paperHasSymptom.getSymptomId() == diaryHasSymptom.getSymptom().getId()) {
                                                    element = ResponsePaperSymptomRecordDto.builder()
                                                            .symptomName(diaryHasSymptom.getSymptom().getName())
                                                            .score(paperHasSymptom.getScore())
                                                            .symptomId(
                                                                    paperHasSymptom.getSymptomId())
                                                            .build();
                                                    break;
                                                }
                                            }
                                            return element;
                                        }
                                ).collect(Collectors.toList())
                        )
                        .build()
        ).collect(Collectors.toList());
    }
}
