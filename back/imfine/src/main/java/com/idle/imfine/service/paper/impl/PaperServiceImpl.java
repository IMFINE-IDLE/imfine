package com.idle.imfine.service.paper.impl;


import com.idle.imfine.data.dto.comment.response.ResponseCommentDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.image.UploadFile;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.image.Image;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.repository.comment.CommentRepository;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.image.ImageRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.errors.code.DiaryErrorCode;
import com.idle.imfine.errors.code.PaperErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.FileStore;
import com.idle.imfine.service.paper.PaperService;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PaperServiceImpl implements PaperService {
    private final PaperRepository paperRepository;
    private final DiaryRepository diaryRepository;
    private final PaperHasSymptomRepository paperHasSymptomRepository;
    private final ImageRepository imageRepository;
    private final Common common;
    private final HeartRepository heartRepository;
    private final FollowRepository followRepository;
    private final ConditionRepository conditionRepository;
    private final FileStore fileStore;
    private final CommentRepository commentRepository;
    static final Logger LOGGER = LoggerFactory.getLogger(PaperServiceImpl.class);

    @Override
    @Transactional
    public void save(RequestPaperPostDto requestPaperPostDto, String uid) throws IOException {
        User user = common.getUserByUid(uid);

        ///// 에러처리 똑바로 하기
        Diary diary = diaryRepository.findById(requestPaperPostDto.getDiaryId())
                .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));

        Paper exist = paperRepository.getByDiaryAndDate(diary, common.convertDateType(requestPaperPostDto.getDate()));
        if (exist != null) {
            throw new ErrorException(PaperErrorCode.PAPER_DUPLICATE_DATE);
        }

        Paper savedPaper = paperRepository.save(Paper.builder()
                .diary(diary)
                .content(requestPaperPostDto.getContents())
                .open(requestPaperPostDto.isOpen())
                .date(LocalDate.now())
                .build());
        List<UploadFile> storeImageFiles;
        storeImageFiles = fileStore.storeFiles(requestPaperPostDto.getImages());
        diary.paperAdd();
        diary.setPostedAt(LocalDateTime.now());

        Stream<Image> saveImage = storeImageFiles.stream().map(
                path ->  Image.builder()
                        .paperId(savedPaper.getId())
                        .path(path.getStoreFileName())
                        .build()
        );
        if (saveImage.count() != 0){
            imageRepository.saveAll(saveImage.collect(Collectors.toList()));
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
        User user = common.getUserByUid(uid);
        Paper foundPaper = paperRepository.findById(paperId)
            .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));
        paperHasSymptomRepository.deleteByPaper(foundPaper.getId());
        paperRepository.deleteById(paperId);
    }

    @Override
    @Transactional
    public void modifyPaper(RequestPaperPutDto requestPaperPutDto, String uid) {
        User user = common.getUserByUid(uid);

        Paper paper = paperRepository.findById(requestPaperPutDto.getPaperId())
            .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        paper.setContent(requestPaperPutDto.getContents());
        paper.setOpen(requestPaperPutDto.isOpen());
        List<PaperHasSymptom> symptoms = paper.getPaperHasSymptoms();

        for (PaperHasSymptom symptom : symptoms) {
            for (ResponseSymptomRecordDto putSymptom : requestPaperPutDto.getSymptoms()) {
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
    }

    @Override
    @Transactional
    public void deletePaperLike(RequestHeartDto requestHeartDto, String uid) {
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
    public ResponsePaperDetailDto getPaperDetail(long paperId, String uid) {
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
                        .name(user.getName())
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
                .build();

    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponsePaperDto> getPaperList(String uid, Pageable pageable) {
        User user = common.getUserByUid(uid);
        List<User> users = followRepository.findAllByFollowingUser(user)
                .stream().map(Follow::getFollowedUser).collect(Collectors.toList());
        List<Diary> diaries = diaryRepository.findAllByWriterIn(users);
        List<Diary> diaries1 = diaryRepository.findAllByUserId(user.getId());

        diaries.addAll(diaries1);
        diaries = diaries.stream().distinct().collect(Collectors.toList());

        List<Paper> papers = paperRepository.findAllByDiariesIn(diaries, pageable);
        List<Paper> myHeartPapers = paperRepository.findHeartPaperByUserIdAAndDiaryIn(user.getId(),
                diaries);

        return papers.stream().map(
                paper -> ResponsePaperDto.builder()
                        .diaryId(paper.getDiary().getId())
                        .title(paper.getDiary().getTitle())
                        .content(paper.getContent())
                        .paperId(paper.getId())
                        .uid(paper.getDiary().getWriter().getUid())
                        .commentCount(paper.getCommentCount())
                        .likeCount(paper.getLikeCount())
                        .name(paper.getDiary().getWriter().getName())
                        .myHeart(myHeartPapers.stream().anyMatch(heartPaper -> heartPaper.getId()
                            .equals(paper.getId())))
                        .date(paper.getDate())
                        .createdAt(common.convertDateAllType(paper.getCreatedAt()))
                        .open(paper.isOpen())
                        .condition(String.format("%d",conditionRepository.findByUserAndDate(paper.getDiary()
                                .getWriter(), paper.getDate()).orElseGet(Condition::new).getCondition()))
                        .images(paper.getImages().stream().map(
                            Image::getPath
                        ).collect(Collectors.toList()))
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

    @Override
    @Transactional(readOnly = true)
    public List<ResponsePaperDto> getAllPaperByDate(String uid, String date) {
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
                        .images(paper.getImages().stream().map(
                            Image::getPath
                        ).collect(Collectors.toList()))
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
