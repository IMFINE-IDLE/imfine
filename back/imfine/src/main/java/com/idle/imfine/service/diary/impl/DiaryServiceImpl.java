package com.idle.imfine.service.diary.impl;

import com.idle.imfine.data.dto.diary.request.RequestDiaryFilterDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryModifyDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.request.RequestDiarySubscribeDto;
import com.idle.imfine.data.dto.diary.request.RequestSymptomChartDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryPostPaper;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.diary.response.ResponsePutMedicalSymptomsDto;
import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.data.dto.symptom.request.RequestSymptomRegistrationDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomChartRecordDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomScoreDto;
import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.Subscribe;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.diary.SubscribeRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.medical.MedicalCodeRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.symptom.DiaryHasSymptomRepository;
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.DiaryErrorCode;
import com.idle.imfine.errors.code.DiaryHasSymptomErrorCode;
import com.idle.imfine.errors.code.FollowErrorCode;
import com.idle.imfine.errors.code.SubscribeErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.diary.DiaryService;
import com.idle.imfine.service.notification.NotificationService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final DiaryHasSymptomRepository diaryHasSymptomRepository;
    private final SymptomRepository symptomRepository;
    private final UserRepository userRepository;
    private final MedicalCodeRepository medicalCodeRepository;
    private final PaperHasSymptomRepository paperHasSymptomRepository;
    private final PaperRepository paperRepository;
    private final SubscribeRepository subscribeRepository;
    private final Common common;
    private final Logger LOGGER = LoggerFactory.getLogger(DiaryService.class);
    private final ConditionRepository conditionRepository;
    private final NotificationService notificationService;
    private final HeartRepository heartRepository;

    @Override
    @Transactional
    public long save(RequestDiaryPostDto saveDiary, String uId) {
        User user = common.getUserByUid(uId);
        MedicalCode medicalCode = medicalCodeRepository.getById(saveDiary.getMedicalId());

        Diary diary = Diary.builder()
                .medicalCode(medicalCode)
                .title(saveDiary.getTitle())
                .description(saveDiary.getDescription())
                .image(saveDiary.getImage())
                .active(true)
                .writer(user)
                .active(saveDiary.isOpen())
                .build();

        List<Integer> symptoms = saveDiary.getSymptom();
        Diary savedDiary = diaryRepository.save(diary);
        if (symptoms.size() != 0) {
            for (Integer s : symptoms) {
                Symptom symptom = symptomRepository.getById(s);
                diaryHasSymptomRepository.save(DiaryHasSymptom.builder()
                        .symptom(symptom)
                        .diary(savedDiary)
                        .build());
            }
        }
        return savedDiary.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseDiaryDetailDto getDiaryDetail(long diaryId, String uid) {
        User user = common.getUserByUid(uid);

        // 다이어리 찾기
        Diary foundDiary = diaryRepository.findDiaryByIdFetchDetail(diaryId)
            .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));

        // 심텀들 찾기
        List<DiaryHasSymptom> diaryHasSymptoms = foundDiary.getDiaryHasSymptoms();
        List<ResponseSymptomDto> responseSymptomDtos = new ArrayList<>();


        for (DiaryHasSymptom forEachHasSyomptom : diaryHasSymptoms) {
            responseSymptomDtos.add(ResponseSymptomDto.builder()
                    .symptomId(forEachHasSyomptom.getId())
                    .symptomName(forEachHasSyomptom.getSymptom().getName())
                    .build());
        }
        List<ResponseMedicalListDto> medicals = new ArrayList<>();
        medicals.add(ResponseMedicalListDto.builder()
                .medicalId(foundDiary.getMedicalCode().getId())
                .medicalName(foundDiary.getMedicalCode().getName())
                .build());

        return ResponseDiaryDetailDto.builder()
                .userId(foundDiary.getWriter().getId())
                .uid(foundDiary.getWriter().getUid())
                .userStatus(uid.equals(foundDiary.getWriter().getName()) ? 0 : 1)
                .title(foundDiary.getTitle())
                .isSubscribe(subscribeRepository.existsByDiaryAndUserId(foundDiary, user.getId()))
                .description(foundDiary.getDescription())
                .name(foundDiary.getWriter().getName())
                .medicals(medicals)
                .beginDate(
                        foundDiary.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .endedDate(foundDiary.getEndedAt() != null ? foundDiary.getEndedAt()
                        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null)
                .diaryHasSymptoms(responseSymptomDtos)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseSymptomChartRecordDto> getDiarySymptomsAll(RequestSymptomChartDto requestDto) {
        LOGGER.info("일기장 증상 차트 조회");
        LocalDate date = common.convertDateType(requestDto.getDate());
        int minusDays = date.getDayOfWeek().getValue();
        LocalDate startDate = date.minusDays(minusDays);
        LocalDate endDate = startDate.plusDays(6);

        LOGGER.info("일기장 증상 차트 조회 시작일 {} .. 종료일 .. {}", startDate, endDate);
        Diary diary = diaryRepository.findById(requestDto.getDiaryId())
            .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));


        List<Symptom> symptomByDiary = diaryHasSymptomRepository.getAllByDiaryIdSymptomMap(
                diary);
        Map<Integer, String> symptomIdByName = new HashMap<>();
        symptomByDiary.forEach(
                symptom -> symptomIdByName.put(symptom.getId(), symptom.getName())
        );

        List<PaperHasSymptom> paperHasSymptoms = paperHasSymptomRepository.findPaperHasSymptomByPaperIn(
                diary, startDate, endDate);


        Map<String, List<ResponseSymptomScoreDto>> responsePureDto = new HashMap<>();
        LocalDate crtDate = startDate;
        for (int i = 0; i < 7; i++) {
            responsePureDto.put(crtDate.toString(),new ArrayList<>());
            crtDate = crtDate.plusDays(1);
        }

        for (PaperHasSymptom paperHasSymptom : paperHasSymptoms) {
            if (paperHasSymptom == null) {
                continue;
            }

            responsePureDto.get(paperHasSymptom.getPaper().getDate().toString()).add(
                    ResponseSymptomScoreDto.builder()
                            .symptomName(
                                    symptomIdByName.get(
                                            paperHasSymptom.getSymptomId()))
                            .score(paperHasSymptom.getScore())
                            .build());
        }

        crtDate = startDate;
        List<ResponseSymptomChartRecordDto> responseDto = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            String dateString = crtDate.toString();
            responseDto.add(
                    ResponseSymptomChartRecordDto.builder()
                            .date(dateString)
                            .symptoms(responsePureDto.get(dateString))
                            .build());
            crtDate = crtDate.plusDays(1);
        }

        LOGGER.info("증상 목록 정렬 완료 ");
        return responseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public ResponsePaperDto getPaper(long diaryId, String date, String uid) {
        User user = common.getUserByUid(uid);
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));

        Optional<Paper> OptionalPaper = paperRepository.getByDiary_IdAndDate(diary.getId(), common.convertDateType(date));
        if (OptionalPaper.isEmpty()) {
            return null;
        }
        Paper paper = OptionalPaper.get();
        return ResponsePaperDto.builder()
                .diaryId(diaryId)
                .title(diary.getTitle())
                .paperId(paper.getId())
                .uid(diary.getWriter().getUid())
                .name(diary.getWriter().getName())
                .content(paper.getContent())
                .myHeart(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 2, paper.getId()))
                .commentCount(paper.getCommentCount())
                .likeCount(paper.getLikeCount())
                .date(paper.getDate())
                .createdAt(paper.getCreatedAt().toString())
                .condition(String.format("%d", conditionRepository.findByUserAndDate(diary.getWriter(), paper.getDate()).orElseGet(
                        Condition::new).getCondition()))
                .open(paper.isOpen())
                .image(paper.getImages().size() != 0)
                .symptomList(paper.getPaperHasSymptoms().stream().map(
                        symptom ->
                                ResponsePaperSymptomRecordDto.builder()
                                        .symptomId(symptom.getSymptomId())
                                        .score(symptom.getScore())
                                        .symptomName(
                                                symptomRepository.getById(symptom.getSymptomId())
                                                        .getName())
                                        .build()
                ).collect(Collectors.toList()))
                .build();
    }

    @Override
    @Transactional
    public void saveSubscribe(RequestDiarySubscribeDto requestDiarySubscribeDto) {
        Diary diary = diaryRepository.findById(requestDiarySubscribeDto.getDiaryId())
            .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));
        long userId = common.getUserByUid(requestDiarySubscribeDto.getUid()).getId();

        if (subscribeRepository.existsByDiaryAndUserId(diary, userId)) {
            throw new ErrorException(SubscribeErrorCode.SUBSCRIBE_DUPLICATE_DIARY);
        }
        subscribeRepository.save(Subscribe.builder()
            .diary(diary)
            .userId(userId)
            .build());
        diary.setSubscribeCount(diary.getSubscribeCount() + 1);
        diaryRepository.save(diary);
        notificationService.send(userId, diary.getWriter().getId(), 1, diary.getId(), 1);
    }

    @Override
    @Transactional
    public void deleteSubscribe(RequestDiarySubscribeDto requestDiarySubscribeDto) {
        Diary diary = diaryRepository.getById(requestDiarySubscribeDto.getDiaryId());
        long userId = userRepository.getByUid(requestDiarySubscribeDto.getUid()).getId();

        if (!subscribeRepository.existsByDiaryAndUserId(diary, userId)) {
            throw new ErrorException(SubscribeErrorCode.SUBSCRIBE_NOT_FOUND);
        }

        diary.setSubscribeCount(diary.getSubscribeCount() - 1);
        diaryRepository.save(diary);
        subscribeRepository.deleteByDiaryAndUserId(diary, userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseDiaryListDto> getDiaryList(RequestDiaryFilterDto requestDiaryFilterDto,
            Pageable pageable) {
        List<Symptom> symptoms = symptomRepository.findByIdIn(requestDiaryFilterDto.getSymptomId());
        List<DiaryHasSymptom> diaryHasSymptoms = diaryHasSymptomRepository.getDiaryHasSymptomBySymptomIn(
                symptoms);
        List<MedicalCode> medicalCodes = medicalCodeRepository.findByIdIn(
                requestDiaryFilterDto.getMedicalId());

        Slice<Diary> diaryPage;
        if (requestDiaryFilterDto.getMedicalId().size() == 0
                && requestDiaryFilterDto.getSymptomId().size() == 0) {
            diaryPage = diaryRepository.findAllByOpenTrue(pageable);
        } else if (requestDiaryFilterDto.getMedicalId().size() == 0) {
            diaryPage = diaryRepository.findByDiaryHasSymptomsInAndOpenTrue(diaryHasSymptoms, pageable);
        } else if (requestDiaryFilterDto.getSymptomId().size() == 0) {
            diaryPage = diaryRepository.findByMedicalCodeInAndOpenTrue(medicalCodes,  pageable);
        } else {
            diaryPage = diaryRepository.findByOpenTrueOrMedicalCodeInAndOpenTrueOrDiaryHasSymptomsIn(medicalCodes,
                    diaryHasSymptoms, pageable);
        }

        return diaryPage.stream().map(
            diary -> ResponseDiaryListDto.builder()
                .diaryId(diary.getId())
                .title(diary.getTitle())
                .medicalName(diary.getMedicalCode().getName())
                .name(diary.getWriter().getName())
                .image(diary.getImage())
                .subscribeCount(diary.getSubscribeCount())
                .paperCount(diary.getPaperCount())
                .hasNext(diaryPage.hasNext())
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void modifyDiary(RequestDiaryModifyDto requestDiaryModifyDto, String uid) {
        User user = userRepository.getByUid(uid);
        Diary diary = diaryRepository.getById(requestDiaryModifyDto.getDiaryId());

        if (user.getId() != diary.getWriter().getId()) {
            throw new ErrorException(DiaryErrorCode.DIARY_WRONG_USER);
        }

        diary.setTitle(requestDiaryModifyDto.getTitle());
        diary.setDescription(requestDiaryModifyDto.getDescription());
        diary.setOpen(requestDiaryModifyDto.isOpen());
        diary.setActive(requestDiaryModifyDto.isActive());
        if (!diary.isActive()) {
            diary.setEndedAt(LocalDateTime.now());
        }
        diaryRepository.save(diary);
    }

    @Override
    @Transactional
    public void deleteDiary(long diaryId, String uid) {
        User user = userRepository.getByUid(uid);
        Diary diary = diaryRepository.findByIdAndWriter(diaryId, user)
            .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));

        diaryRepository.delete(diary);
    }

    @Override
    @Transactional
    public void addDairyHasSymptom(RequestSymptomRegistrationDto requestSymptomRegistrationDto,
            String uid) {
        User user = userRepository.getByUid(uid);
        Diary diary = diaryRepository.findById(requestSymptomRegistrationDto.getDiaryId())
            .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));

        Optional<DiaryHasSymptom> foundDiaryHasSymptom = diaryHasSymptomRepository.findDiaryHasSymptomByDiary_IdAndSymptom_Id(
                requestSymptomRegistrationDto.getDiaryId(),
                requestSymptomRegistrationDto.getSymptomId());
        if (user.getId() != diary.getWriter().getId()) {
            throw new ErrorException(DiaryErrorCode.DIARY_WRONG_USER);
        } else if (foundDiaryHasSymptom.isPresent()) {
            throw new ErrorException(DiaryErrorCode.DIARY_DUPLICATE_SYMPTOM);
        }

        Symptom symptom = symptomRepository.getById(
                requestSymptomRegistrationDto.getSymptomId());
        diaryHasSymptomRepository.save(DiaryHasSymptom.builder()
                .diary(diary)
                .symptom(symptom)
                .build());
    }

    @Override
    @Transactional
    public void deleteDiaryHasSymptom(int diaryHasSymptomId, String uid) {
        User user = common.getUserByUid(uid);
        DiaryHasSymptom diaryHasSymptom = diaryHasSymptomRepository.findById(diaryHasSymptomId)
                .orElseThrow(() -> new ErrorException(DiaryHasSymptomErrorCode.SYMPTOM_NOT_FOUND));
        LOGGER.info("삭제하러 들어옴...............{}, {}", diaryHasSymptom.getDiary().getId(), uid);
        paperHasSymptomRepository.deleteBySymptomId(diaryHasSymptom.getSymptom().getId(), paperRepository.findAllJoinFetch(diaryHasSymptom.getDiary()));
        diaryHasSymptomRepository.delete(diaryHasSymptom);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseDiaryPostPaper> getMyDiaryList(String uid) {
        return diaryRepository.findAllByWriter(common.getUserByUid(uid)).stream().map(
                diary -> ResponseDiaryPostPaper.builder()
                        .diaryId(diary.getId())
                        .title(diary.getTitle())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ResponsePutMedicalSymptomsDto getDiaryMedicalAndSymptom(long diaryId, String uid) {
        Diary diary = diaryRepository.findByFetchSymptom(diaryId)
                .orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));
        if (!diary.getWriter().getUid().equals(uid)) {
            throw new ErrorException(DiaryErrorCode.DIARY_WRONG_USER);
        }

        return ResponsePutMedicalSymptomsDto.builder()
                .medical(ResponseMedicalListDto.builder()
                        .medicalId(diary.getMedicalCode().getId())
                        .medicalName(diary.getMedicalCode().getName())
                        .build())
                .symptomList(diary.getDiaryHasSymptoms().stream().map(
                        diaryHasSymptom -> ResponseSymptomDto.builder()
                                .symptomId(diaryHasSymptom.getId())
                                .symptomName(diaryHasSymptom.getSymptom().getName())
                                .build()
                ).collect(Collectors.toList()))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseDiaryListDto> getDiarySubscribe(String uid, String otherUid) {
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);
        int relation = common.getFollowRelation(user, other);
        if (relation > 1 && !other.isOpen()) {
            throw new ErrorException(DiaryErrorCode.DIARY_NOT_AUTHORIZED);
        }
        List<Diary> diaries = diaryRepository.findAllByWriterAndSubscribe(other);
        return diaries.stream()
                .filter(Diary::isOpen)
                .map(
                    diary -> ResponseDiaryListDto.builder()
                            .diaryId(diary.getId())
                            .title(diary.getTitle())
                            .medicalName(diary.getMedicalCode().getName())
                            .name(diary.getWriter().getName())
                            .paperCount(diary.getPaperCount())
                            .subscribeCount(diary.getSubscribeCount())
                            .image(diary.getImage())
                            .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseDiaryListDto> getDiaryMyWrite(String uid, String otherUid) {
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);
        int relation = common.getFollowRelation(user, other);
        if (relation > 1 && !other.isOpen()) {
            throw new ErrorException(DiaryErrorCode.DIARY_NOT_AUTHORIZED);
        }
        List<Diary> diaries = diaryRepository.findByDiaryFetchMedicalCode(user);
        return diaries.stream()
                .filter(Diary::isOpen)
                .map(
                diary -> ResponseDiaryListDto.builder()
                        .diaryId(diary.getId())
                        .title(diary.getTitle())
                        .medicalName(diary.getMedicalCode().getName())
                        .name(diary.getWriter().getName())
                        .paperCount(diary.getPaperCount())
                        .subscribeCount(diary.getSubscribeCount())
                        .image(diary.getImage())
                        .build()
        ).collect(Collectors.toList());
    }
}
