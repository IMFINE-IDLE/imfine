package com.idle.imfine.data.repository.symptom;


import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.symptom.Symptom;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SymptomRepository extends JpaRepository<Symptom, Integer> {
    List<Symptom> findByIdIn(List<Integer> symptomIds);
    List<Symptom> findBySymptomCodeId(int symptomCode);
    @Query("select distinct s "
            + "from Symptom s "
            + "join DiaryHasSymptom dhs on s=dhs.symptom "
            + "join Diary d on d=dhs.diary "
            + "join Paper p on p.diary = d "
            + "where p in :paperList")
    List<Symptom> getSymptomByPapers(@Param("paperList") List<Paper> paperList);
}
