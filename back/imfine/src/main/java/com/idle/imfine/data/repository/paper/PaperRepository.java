package com.idle.imfine.data.repository.paper;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.paper.Paper;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaperRepository extends JpaRepository<Paper, Long> {
    List<Paper> getPaperByDiary(Diary diary);
    @Query("select DISTINCT p from Paper p left join fetch p.paperHasSymptoms phs where p.diary = :diary")
    List<Paper> findAllJoinFetch(@Param("diary") Diary diary);
    Paper findByDiaryAndDate(Diary diary, String date);
    boolean existsAllByDiary(Diary diary);
    @Query("select p from Paper p where p.diary in :diaries")
    List<Paper> findAllByDiariesIn(@Param("diaries") List<Diary> diaries, Pageable pageable);
}
