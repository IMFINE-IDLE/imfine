package com.idle.imfine.service.diary.impl;

import com.idle.imfine.data.dto.diary.request.RequestDiaryFilterDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryModifyDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.request.RequestDiarySubscribeDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryPostPaper;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.diary.response.ResponsePutMedicalSymptomsDto;
import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.data.dto.symptom.request.RequestSymptomRegistrationDto;
import com.idle.imfine.data.dto.symptom.response.ResponseDateScoreDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomChartRecordDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Subscribe;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.diary.SubscribeRepository;
import com.idle.imfine.data.repository.medical.MedicalCodeRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.symptom.DiaryHasSymptomRepository;
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.diary.DiaryService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Override
    @Transactional
    public void save(RequestDiaryPostDto saveDiary, String uId) {
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
                Symptom symptom = symptomRepository.findById(s)
                        .orElseThrow(RuntimeException::new);
                diaryHasSymptomRepository.save(DiaryHasSymptom.builder()
                        .symptom(symptom)
                        .diary(savedDiary)
                        .build());
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseDiaryDetailDto getDiaryDetail(long diaryId, String uid) {
        // 다이어리 찾기
        Diary foundDiary = diaryRepository
                .findById(diaryId).orElseThrow(RuntimeException::new);

        // 심텀들 찾기
        List<DiaryHasSymptom> diaryHasSymptoms = diaryHasSymptomRepository.getAllByDiaryId(diaryId);
        List<ResponseSymptomDto> responseSymptomDtos = new ArrayList<>();


        for (DiaryHasSymptom forEachHasSyomptom : diaryHasSymptoms) {
            responseSymptomDtos.add(ResponseSymptomDto.builder()
                    .symptomId(forEachHasSyomptom.getId())
                    .symptomName(forEachHasSyomptom.getSymptom().getName())
                    .build());
        }

        return ResponseDiaryDetailDto.builder()
                .userId(foundDiary.getWriter().getId())
                .userStatus(uid.equals(foundDiary.getWriter().getName()) ? 0 : 1)
                .title(foundDiary.getTitle())
                .description(foundDiary.getDescription())
                .userName(foundDiary.getWriter().getName())
                .medicalName(foundDiary.getMedicalCode().getName())
                .beginDate(
                        foundDiary.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .endedDate(foundDiary.getEndedAt() != null ? foundDiary.getEndedAt()
                        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null)
                .diaryHasSymptoms(responseSymptomDtos)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseSymptomChartRecordDto> getDiarySymptomsAll(long diaryId) {
        Diary diary = diaryRepository.getById(diaryId);
        List<Paper> papers = paperRepository.findAllJoinFetch(diary);

        Map<String, Integer> symptomIdByName = new HashMap<>();
        List<ResponseSymptomChartRecordDto> recordDtos = new ArrayList<>();
        for (DiaryHasSymptom symptom : diary.getDiaryHasSymptoms()) {
            recordDtos.add(ResponseSymptomChartRecordDto.builder()
                    .symptomName(symptom.getSymptom().getName())
                    .responseDateScoreDtos(new ArrayList<>())
                    .build());
            symptomIdByName.put(symptom.getSymptom().getName(), symptom.getId());
        }

        for (Paper paper : papers) {
            for (PaperHasSymptom paperHasSymptom : paper.getPaperHasSymptoms()) {
                for (ResponseSymptomChartRecordDto recordList : recordDtos) {
                    if ((int) symptomIdByName.get(recordList.getSymptomName())
                            == (int) paperHasSymptom.getSymptomId()) {
                        recordList.getResponseDateScoreDtos().add(ResponseDateScoreDto.builder()
                                .score(paperHasSymptom.getScore())
                                .date(paper.getDate())
                                .build());
                        break;
                    }
                }
            }
        }
        return recordDtos;
    }

    @Override
    @Transactional(readOnly = true)
    public ResponsePaperDto getPaper(long diaryId, String date) {
        Diary diary = diaryRepository.getById(diaryId);
        Paper paper = paperRepository.findByDiaryAndDate(diary, common.convertDateType(date));
        ResponsePaperDto responsePaperDto = ResponsePaperDto.builder()
                .paperId(paper.getId())
                .commentCount(paper.getCommentCount())
                .likeCount(paper.getLikeCount())
                .date(paper.getDate())
                .condition(conditionRepository.findByUserAndDate(diary.getWriter(), paper.getDate()).get().getCondition())
                .open(paper.isOpen())
                .images(new ArrayList<>())
                .symptomList(paper.getPaperHasSymptoms().stream().map(
                        symtom ->
                                ResponsePaperSymptomRecordDto.builder()
                                        .symptomId(symtom.getSymptomId())
                                        .score(symtom.getScore())
                                        .symptomName(
                                                symptomRepository.getById(symtom.getSymptomId())
                                                        .getName())
                                        .build()
                ).collect(Collectors.toList()))
                .build();

        return responsePaperDto;
    }

    @Override
    @Transactional
    public void saveSubscribe(RequestDiarySubscribeDto requestDiarySubscribeDto) {
        Diary diary = diaryRepository.getById(requestDiarySubscribeDto.getDiaryId());
        long userId = userRepository.getByUid(requestDiarySubscribeDto.getUid()).getId();

        if (!subscribeRepository.existsByDiaryAndUserId(diary, userId)) {
            subscribeRepository.save(Subscribe.builder()
                    .diary(diary)
                    .userId(userId)
                    .build());
            diary.setSubscribeCount(diary.getSubscribeCount() + 1);
            diaryRepository.save(diary);
        }
    }

    @Override
    @Transactional
    public void deleteSubscribe(RequestDiarySubscribeDto requestDiarySubscribeDto) {
        Diary diary = diaryRepository.getById(requestDiarySubscribeDto.getDiaryId());
        long userId = userRepository.getByUid(requestDiarySubscribeDto.getUid()).getId();

        if (subscribeRepository.existsByDiaryAndUserId(diary, userId)) {
            diary.setSubscribeCount(diary.getSubscribeCount() - 1);
            diaryRepository.save(diary);
            subscribeRepository.deleteByDiaryAndUserId(diary, userId);
        }
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

        Page<Diary> diaryPage;
        if (requestDiaryFilterDto.getMedicalId().size() == 0
                && requestDiaryFilterDto.getSymptomId().size() == 0) {
            diaryPage = diaryRepository.findAll(pageable);
        } else if (requestDiaryFilterDto.getMedicalId().size() == 0) {
            diaryPage = diaryRepository.findByDiaryHasSymptomsIn(diaryHasSymptoms, pageable);
        } else if (requestDiaryFilterDto.getSymptomId().size() == 0) {
            diaryPage = diaryRepository.findByMedicalCodeIn(medicalCodes, pageable);
        } else {
            diaryPage = diaryRepository.findByMedicalCodeInOrDiaryHasSymptomsIn(medicalCodes,
                    diaryHasSymptoms, pageable);
        }

        List<ResponseDiaryListDto> responseDiaryListDtos = new ArrayList<>();
        for (Diary diary : diaryPage) {
            responseDiaryListDtos.add(ResponseDiaryListDto.builder()
                    .diaryId(diary.getId())
                    .title(diary.getTitle())
                    .name(diary.getWriter().getName())
                    .image(diary.getImage())
                    .subscribeCount(diary.getSubscribeCount())
                    .paperCount(diary.getPaperCount())
                    .build());
        }
        return responseDiaryListDtos;
    }

    @Override
    @Transactional
    public void modifyDiary(RequestDiaryModifyDto requestDiaryModifyDto, String uid) {
        User user = userRepository.getByUid(uid);
        Diary diary = diaryRepository.getById(requestDiaryModifyDto.getDiaryId());

        if (user.getId() == diary.getWriter().getId()) {
            diary.setTitle(requestDiaryModifyDto.getTitle());
            diary.setDescription(requestDiaryModifyDto.getDescription());
            diary.setOpen(requestDiaryModifyDto.isOpen());
            diary.setActive(requestDiaryModifyDto.isActive());
            if (!diary.isActive()) {
                diary.setEndedAt(LocalDateTime.now());
            }
            diaryRepository.save(diary);
        } else {
            /// 예외처리
        }
    }

    @Override
    @Transactional
    public void deleteDiary(long diaryId, String uid) {
        User user = userRepository.getByUid(uid);
        Optional<Diary> diary = diaryRepository.findByIdAndWriter(diaryId, user);

        if (diary.isPresent()) {
            diaryRepository.delete(diary.get());
        } else {
            /// 잘못된 결과 에러처리
        }
    }

    @Override
    @Transactional
    public void addDairyHasSymptom(RequestSymptomRegistrationDto requestSymptomRegistrationDto,
            String uid) {
        User user = userRepository.getByUid(uid);
        Diary diary = diaryRepository.getById(requestSymptomRegistrationDto.getDiaryId());
        Optional<DiaryHasSymptom> foundDiaryHasSymptom = diaryHasSymptomRepository.findDiaryHasSymptomByDiary_IdAndSymptom_Id(
                requestSymptomRegistrationDto.getDiaryId(),
                requestSymptomRegistrationDto.getSymptomId());
        if (user.getId() != diary.getWriter().getId()) {
            // 요청이 유저와 다른경우
        } else if (foundDiaryHasSymptom.isPresent()) {
            // 이미 일기장이 증상을 가지고 있을 때
        } else {
            // 올바른 경우
            Symptom symptom = symptomRepository.getById(
                    requestSymptomRegistrationDto.getSymptomId());
            diaryHasSymptomRepository.save(DiaryHasSymptom.builder()
                    .diary(diary)
                    .symptom(symptom)
                    .build());
        }
    }

    @Override
    @Transactional
    public void deleteDiaryHasSymptom(int diaryHasSymptomId, String uid) {
        User user = common.getUserByUid(uid);
        DiaryHasSymptom diaryHasSymptom = diaryHasSymptomRepository.findById(diaryHasSymptomId)
                .orElseThrow(RuntimeException::new);
        LOGGER.info("삭제하러 들어옴...............{}, {}", diaryHasSymptom.getDiary().getId(), uid);
        paperHasSymptomRepository.deleteBySymptomId(diaryHasSymptom.getSymptom().getId(), paperRepository.findAllJoinFetch(diaryHasSymptom.getDiary()));
        diaryHasSymptomRepository.delete(diaryHasSymptom);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseDiaryPostPaper> getMyDiaryList(String uid) {
        return diaryRepository.findAllByUserId(common.getUserByUid(uid).getId()).stream().map(
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
                .orElseThrow(RuntimeException::new);
        if (!diary.getWriter().getUid().equals(uid)) {
            // 에러처리 하기
            throw new RuntimeException("잘못된 접근입니다.");
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
}
