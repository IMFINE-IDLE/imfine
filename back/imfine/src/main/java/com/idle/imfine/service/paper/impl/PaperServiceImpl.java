package com.idle.imfine.service.paper.impl;


import com.idle.imfine.data.dto.comment.response.ResponseCommentDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.image.Image;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.diary.SubscribeRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.image.ImageRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.service.paper.PaperService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PaperServiceImpl implements PaperService {
    private final PaperRepository paperRepository;
    private final DiaryRepository diaryRepository;
    private final PaperHasSymptomRepository paperHasSymptomRepository;
    private final ImageRepository imageRepository;
    private final UserDetailsService userDetailsService;
    private final HeartRepository heartRepository;
    private final FollowRepository followRepository;
    private final SubscribeRepository subscribeRepository;
    @Override
    @Transactional
    public void save(RequestPaperPostDto requestPaperPostDto, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);

        ///// 에러처리 똑바로 하기
        Diary diary = diaryRepository.findById(requestPaperPostDto.getDiaryId())
                .orElseThrow(RuntimeException::new);

        Paper exist = paperRepository.findByDiaryAndDate(diary, requestPaperPostDto.getDate());
        if (exist != null) {
            throw new RuntimeException();
        }

        Paper savedPaper = paperRepository.save(Paper.builder()
                .diary(diary)
                .content(requestPaperPostDto.getContents())
                .open(requestPaperPostDto.isOpen())
                .date(requestPaperPostDto.getDate())
                .build());

        diary.paperAdd();
        diary.setPostedAt(LocalDateTime.now());
        Stream<Image> saveImage = requestPaperPostDto.getImages().stream().map(
                path ->  Image.builder()
                        .paperId(savedPaper.getId())
                        .path(path)
                        .build()
        );
        imageRepository.saveAll(saveImage.collect(Collectors.toList()));

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
        User user = (User) userDetailsService.loadUserByUsername(uid);
        Paper foundPaper = paperRepository.findById(paperId).orElseThrow(RuntimeException::new);
        paperHasSymptomRepository.deleteByPaper(foundPaper.getId());
        paperRepository.deleteById(paperId);
    }

    @Override
    @Transactional
    public void modifyPaper(RequestPaperPutDto requestPaperPutDto, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);

        Paper paper = paperRepository.getById(requestPaperPutDto.getPaperId());
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
        // 수정 방법에 대한 고민
        // 전부 삭제 후 다시생성 or 그냥 일일히 비교 탐색 후 값만 바꿔주기
//        paperHasSymptomRepository.deleteBySymptomId(paper);
//
//        Stream<PaperHasSymptom> paperHasSymptomList = requestPaperPutDto.getSymptoms().stream().map(
//                symptomRecord -> PaperHasSymptom.builder()
//                        .symptomId(symptomRecord.getSymptomId())
//                        .score(symptomRecord.getScore())
//                        .build()
//        );
    }

    @Transactional
    @Override
    public void postPaperLike(RequestHeartDto requestHeartDto, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);
        Paper foundPaper = paperRepository.findById(requestHeartDto.getContentId())
                .orElseThrow(RuntimeException::new);

        Heart heart = Heart.builder()
                .contentsCodeId(requestHeartDto.getContentCodeId())
                .contentsId(requestHeartDto.getContentId())
                .senderId(user.getId())
                .build();

        foundPaper.addLikeCount();
        heartRepository.save(heart);
    }

    @Override
    @Transactional
    public void deletePaperLike(RequestHeartDto requestHeartDto, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);
        Paper foundPaper = paperRepository.findById(requestHeartDto.getContentId())
                .orElseThrow(RuntimeException::new);

        heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(requestHeartDto.getContentId(),
                requestHeartDto.getContentCodeId(), user.getId());

        foundPaper.delLikeCount();
    }

    @Override
    @Transactional(readOnly = true)
    public ResponsePaperDetailDto getPaperDetail(long paperId, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);

        // 에러처리 똑바로 하기
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(RuntimeException::new);
        Diary paperDiary = paper.getDiary();

        List<DiaryHasSymptom> diaryHasSymptoms = paperDiary.getDiaryHasSymptoms();
        List<PaperHasSymptom> paperHasSymptoms = paper.getPaperHasSymptoms();
        List<ResponsePaperSymptomRecordDto> responsePaperSymptomRecordDtos = new ArrayList<>();
        for (DiaryHasSymptom diaryHasSymptom: diaryHasSymptoms) {
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

        return ResponsePaperDetailDto.builder()
                .diaryId(paperDiary.getId())
                .userId(user.getId())
                .userStatus(user.getId()==paperDiary.getWriter().getId()? 0 : 2)
                .userName(user.getName())
                .content(paper.getContent())
                .symptoms(responsePaperSymptomRecordDtos)
                .images(paper.getImages().stream().map(
                        Image::getPath
                ).collect(Collectors.toList()))
                .comments(paper.getComments().stream().map(
                        comment -> ResponseCommentDto.builder()
                                .commentId(comment.getId())
                                .userId(comment.getWriter().getId())
                                .likeCount(comment.getLikeCount())
                                .declarationCount(comment.getDeclarationCount())
                                .content(comment.getContent())
                                .createdDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                                .build()
                ).collect(Collectors.toList()))
                .build();

    }

    @Override
    @Transactional
    public List<ResponsePaperDto> getPaperList(String uid, Pageable pageable) {
        User user = (User) userDetailsService.loadUserByUsername(uid);
        List<User> users = followRepository.findAllByFollowingUser(user)
                .stream().map(follow -> follow.getFollowedUser()).collect(Collectors.toList());
        List<Diary> diaries = diaryRepository.findAllByWriterIn(users);
        List<Diary> diaries1 = diaryRepository.findAllByUserId(user.getId());
        diaries.addAll(diaries1);
        diaries = diaries.stream().distinct().collect(Collectors.toList());
        List<Paper> papers = paperRepository.findAllByDiariesIn(diaries, pageable);
        return papers.stream().map(
                paper -> ResponsePaperDto.builder()
                        .paperId(paper.getId())
                        .commentCount(paper.getCommentCount())
                        .likeCount(paper.getLikeCount())
                        .date(paper.getDate())
                        .open(paper.isOpen())
                        .images(paper.getImages().stream().map(
                                image -> image.getPath()
                        ).collect(Collectors.toList()))
                        .responseSymptomRecordDtos(
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
