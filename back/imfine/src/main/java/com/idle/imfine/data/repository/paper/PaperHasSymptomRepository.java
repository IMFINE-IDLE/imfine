package com.idle.imfine.data.repository.paper;

import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PaperHasSymptomRepository extends JpaRepository<PaperHasSymptom, Long> {

    List<PaperHasSymptom> findByPaper(Paper paper);

    List<PaperHasSymptom> findPaperHasSymptomByPaperIn(List<Paper> papers);

    @Modifying
    @Query("delete from PaperHasSymptom phs where phs.symptomId=:symptomId and phs.paper in :papers")
    void deleteBySymptomId(@Param("symptomId") int symptomId, @Param("papers") List<Paper> paper);

    @Modifying
    @Query("delete from PaperHasSymptom phs where phs.paper.id=:paperId")
    void deleteByPaper(@Param("paperId") long paperId);
//
//    @Modifying
//    @Query("update PaperHasSymptom phs set phs.score=:score where phs.id=:phsId")
//    void update
}
