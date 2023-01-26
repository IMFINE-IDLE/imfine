package com.idle.imfine.data.repository.symptom;

import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryHasSymptomRepository extends JpaRepository<DiaryHasSymptom, Integer> {
    List<DiaryHasSymptom> getAllByDiaryId(Long DiaryId);
}
