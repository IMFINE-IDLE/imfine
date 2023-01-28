package com.idle.imfine.service.diary.impl;

import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.symptom.response.ResponseDateScoreDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomChartRecordDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.medical.MedicalCodeRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.symptom.DiaryHasSymptomRepository;
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.service.diary.DiaryService;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final Logger LOGGER = LoggerFactory.getLogger(DiaryService.class);

    @Override
    @Transactional
    public long save(RequestDiaryPostDto saveDiary, String uId) {
        User user = userRepository.getByUid(uId);
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
        LOGGER.info("diary Save ...............symptom Id : {}", symptoms);
        if (symptoms.size() != 0) {
            for (Integer s: symptoms) {
                Symptom symptom = symptomRepository.findById(s)
                        .orElseThrow(RuntimeException::new);
                LOGGER.info("diaryId {}, symptom Id {}, {}", savedDiary.getId(), symptom.getId(), symptom.getName());
                diaryHasSymptomRepository.save(DiaryHasSymptom.builder()
                        .symptom(symptom)
                        .diary(savedDiary)
                        .build());
            }
        }
        return savedDiary.getId();
    }

    @Override
    public ResponseDiaryDetailDto getDiaryDetail(long diaryId, String uid) {
        // 다이어리 찾기
        Diary foundDiary = diaryRepository
                .findById(diaryId).orElseThrow(RuntimeException::new);

        // 심텀들 찾기
        List<DiaryHasSymptom> diaryHasSymptoms = diaryHasSymptomRepository.getAllByDiaryId(diaryId);
        List<ResponseSymptomDto> responseSymptomDtos = new ArrayList<>();

        for (DiaryHasSymptom forEachHasSyomptom:diaryHasSymptoms) {
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
                .beginDate(foundDiary.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .endedDate(foundDiary.getEndedAt() != null ? foundDiary.getEndedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null)
                .diaryHasSymptoms(responseSymptomDtos)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseSymptomChartRecordDto> getDiarySymptomsAll(long diaryId) {
        Diary diary = diaryRepository.getById(diaryId);
        List<Paper> papers = paperRepository.findOneJoinFetch(diary);

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
            String recordDate = paper.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            for (PaperHasSymptom paperHasSymptom : paper.getPaperHasSymptoms()){
                for (ResponseSymptomChartRecordDto recordList : recordDtos) {
                    if (symptomIdByName.get(recordList.getSymptomName()) == paperHasSymptom.getSymptomId()) {
                        recordList.getResponseDateScoreDtos().add(ResponseDateScoreDto.builder()
                                .score(paperHasSymptom.getScore())
                                .date(recordDate)
                                .build());
                        break;
                    }
                }
            }
        }
        return recordDtos;
    }


}
