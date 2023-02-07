package com.idle.imfine.data.repository.symptom;


import com.idle.imfine.data.entity.symptom.Symptom;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SymptomRepository extends JpaRepository<Symptom, Integer> {
    List<Symptom> findByIdIn(List<Integer> symptomIds);
    List<Symptom> findBySymptomCodeId(int symptomCode);
    @Query("select new map(s.id, s.name) from Symptom s join DiaryHasSymptom dhs where dhs.diary.id=:diaryId")
    Map<Integer, String> getAllByDiaryIdSymptomMap(@Param("diaryId") Long DiaryId);
}
