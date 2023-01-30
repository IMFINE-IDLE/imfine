package com.idle.imfine.data.repository.paper;

import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaperHasSymptomRepository extends JpaRepository<PaperHasSymptom, Long> {
    List<PaperHasSymptom> findByPaper(Paper paper);

    void deleteBySymptomId(int symptomId);
}
