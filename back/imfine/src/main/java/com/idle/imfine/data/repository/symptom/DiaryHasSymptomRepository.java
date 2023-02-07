package com.idle.imfine.data.repository.symptom;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryHasSymptomRepository extends JpaRepository<DiaryHasSymptom, Integer> {
    List<DiaryHasSymptom> getAllByDiaryId(Long DiaryId);
    List<DiaryHasSymptom> getDiaryHasSymptomBySymptomIn(List<Symptom> symptoms);
    Optional<DiaryHasSymptom> findDiaryHasSymptomByDiary_IdAndSymptom_Id(long diaryId,
            int symptomId);
//    Map<Long, String>
}
