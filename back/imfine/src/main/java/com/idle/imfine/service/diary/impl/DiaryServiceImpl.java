package com.idle.imfine.service.diary.impl;

import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import com.idle.imfine.data.repository.UserRepository;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.medical.MedicalCodeRepository;
import com.idle.imfine.data.repository.symptom.DiaryHasSymptomRepository;
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.service.diary.DiaryService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
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
    private final Logger LOGGER = LoggerFactory.getLogger(DiaryService.class);
    @Override
    @Transactional
    public long save(RequestDiaryPostDto saveDiary, String uId) {
        User user = userRepository.getByUid(uId);

        Diary diary = Diary.builder()
                .medicalId(saveDiary.getMedicalId())
                .title(saveDiary.getTitle())
                .description(saveDiary.getDescription())
                .image(saveDiary.getImage())
                .active(true)
                .writer(user)
                .active(saveDiary.isOpen())
                .startedDate(LocalDateTime.now())
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
        Diary foundDiary = diaryRepository
                .findById(diaryId).orElseThrow(RuntimeException::new);

        MedicalCode medicalCode = medicalCodeRepository.getById(foundDiary.getMedicalId());

        List<DiaryHasSymptom> diaryHasSymptoms = diaryHasSymptomRepository.getAllByDiaryId(diaryId);

        ResponseDiaryDetailDto responseDiaryDetailDto = ResponseDiaryDetailDto.builder()
                .userId(foundDiary.getWriter().getId())
                .userStatus(uid.equals(foundDiary.getWriter().getName()) ? 0 : 1)
                .title(foundDiary.getTitle())
                .description(foundDiary.getDescription())
                .userName(foundDiary.getWriter().getName())
                .medicalName(medicalCode.getName()) // 해야함
                .beginDate(foundDiary.getStartedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .endedDate(foundDiary.getStartedDate() != null ? foundDiary.getStartedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null)
                .symptomRecords(null)
                .build();

        return responseDiaryDetailDto;
    }
}
