package com.idle.imfine.data.repository.symptom;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiaryHasSymptomRepository extends JpaRepository<DiaryHasSymptom, Integer> {
    List<DiaryHasSymptom> getDiaryHasSymptomBySymptomIn(List<Symptom> symptoms);
    Optional<DiaryHasSymptom> findDiaryHasSymptomByDiary_IdAndSymptom_Id(long diaryId,
            int symptomId);
    @Query("select dhs from DiaryHasSymptom dhs join fetch Symptom s on s.symptomCodeId=dhs.symptom.id where dhs.diary=:diary")
    List<DiaryHasSymptom> getAllByDiaryIdSymptomMap(@Param("diary") Diary diary);
    @Query("select s from Diary d  join DiaryHasSymptom dhs on dhs.diary=d join Symptom s on s=dhs.symptom where d=:diary")
    List<Symptom> findByDiaryToMap(@Param("diary") Diary diary);
    @Query("select dhs from DiaryHasSymptom dhs  join dhs.diary d join fetch dhs.symptom where d=:diary")
    List<DiaryHasSymptom> findDiaryHasSymptomByDiary(@Param("diary") Diary foundDiary);
//    Map<Long, String>
}
