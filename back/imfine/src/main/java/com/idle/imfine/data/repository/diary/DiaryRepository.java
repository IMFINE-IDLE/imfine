package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
//    @Query("select d from Diary d where ")
    Page<Diary> findByMedicalCodeInOrDiaryHasSymptomsIn(List<MedicalCode> medicalCode,
        List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);
    Page<Diary> findByDiaryHasSymptomsIn(List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);
    Page<Diary> findByMedicalCodeIn(List<MedicalCode> medicalCode, Pageable pageable);
    Page<Diary> findAll(Pageable pageable);
    Optional<Diary> findByIdAndWriter(long diaryId, User user);
}
