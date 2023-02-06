package com.idle.imfine.data.repository.paper;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.paper.Paper;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaperRepository extends JpaRepository<Paper, Long> {
    Paper getByDiary_IdAndDate(long diaryId, LocalDate date);
    Optional<Paper> findByDiaryAndDate(Diary diary, LocalDate date);
    List<Paper> findAllByDiaryInAndDate(List<Diary> diaries, LocalDate date);
    @Query("select p from Paper p where p.diary=:diary and p.date=:date")
    Paper getByDiary_IdAndDateJPQL(@Param("diary") Diary diary, @Param("date") LocalDate date);
    @Query("select DISTINCT p from Paper p left join fetch p.paperHasSymptoms phs where p.diary = :diary")
    List<Paper> findAllJoinFetch(@Param("diary") Diary diary);
    @Query("select p from Paper p where p.diary in :diaries and p.open=true")
    List<Paper> findAllByDiariesIn(@Param("diaries") List<Diary> diaries, Pageable pageable);
    @Query("select p from Paper p join Heart h on h.contentsId=p.id where p.diary in :diaries and h.senderId=:userId")
    List<Paper> findHeartPaperByUserIdAAndDiaryIn(@Param("userId") long userId, @Param("diaries") List<Diary> diaries);
}
