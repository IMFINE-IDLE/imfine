package com.idle.imfine.data.repository.paper;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaperHasSymptomRepository extends JpaRepository<PaperHasSymptom, Long> {

    List<PaperHasSymptom> findByPaper(Paper paper);
    @Query("select distinct phs from  PaperHasSymptom phs where phs.paper.diary=:diary and phs.paper.date between :startDate and :endDate")
    List<PaperHasSymptom> findPaperHasSymptomByPaperIn(@Param("diary") Diary diary,
            @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Modifying
    @Query("delete from PaperHasSymptom phs where phs.symptomId=:symptomId and phs.paper in :papers")
    void deleteBySymptomId(@Param("symptomId") int symptomId, @Param("papers") List<Paper> paper);

    @Modifying
    @Query("delete from PaperHasSymptom phs where phs.paper.id=:paperId")
    void deleteByPaper(@Param("paperId") long paperId);

    @Query("SELECT phs.paper.id, phs FROM PaperHasSymptom phs where phs.paper in :papers GROUP BY phs.paper")
    List<Object[]> findPaperHasSymptomByPaperInMap(@Param("papers")List<Paper> paperList);

    List<PaperHasSymptom> findByIdIn(List<Long> symptomIds);
}
