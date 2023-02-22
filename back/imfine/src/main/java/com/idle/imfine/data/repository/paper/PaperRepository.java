package com.idle.imfine.data.repository.paper;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.image.Image;
import com.idle.imfine.data.entity.paper.Paper;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaperRepository extends JpaRepository<Paper, Long> {
    Optional<Paper> getByDiary_IdAndDate(long diaryId, LocalDate date);
    List<Paper> findAllByDiaryInAndDate(List<Diary> diaries, LocalDate date);

    @Query("select p from Paper p where p.date=:date and p.diary in :diaries and (p.diary.writer=:writer or p.open = true)")
    List<Paper> findAllByDiaryInAndDateAndOpenTrueJPQL(@Param("diaries") List<Diary> diaries, @Param("date") LocalDate date, @Param("writer") User writer);
    
    @Query("select p from Paper p join fetch Diary d on p.diary=d where p.id=:paperId")
    Optional<Paper> findPaperByPaperIdJoinDiary(@Param("paperId") long paperId);
//and p.date between :startDate and :endDate
    @Query("select p from Paper p where p.diary=:diary and p.date between :startDate and :endDate")
    List<Paper> findPapersByDiaryAndDateBetween(@Param("diary") Diary diary,
            @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query("select p from Paper p where p.diary=:diary and p.date=:date")
    Paper getByDiary_IdAndDateJPQL(@Param("diary") Diary diary, @Param("date") LocalDate date);
    @Query("select DISTINCT p from Paper p left join fetch p.paperHasSymptoms phs where p.diary = :diary")
    List<Paper> findAllJoinFetch(@Param("diary") Diary diary);
    @Query("select p from Paper p where p.diary in :diaries and p.open=true")
    Slice<Paper> findAllByDiariesIn(@Param("diaries") List<Diary> diaries, Pageable pageable);

    //    @Query("select p from Paper p join Follow f on p.diary.writer=f.followingUser join Subscribe s on s.diary=p.diary where ")
    @Query("SELECT p "
            + "FROM Paper p "
            + "JOIN Diary d "
            + "ON p.diary.id=d.id "
            + "WHERE (d.writer.id=:userId "
            + "OR d.writer.id IN (SELECT f.followedUser.id FROM Follow f WHERE f.followingUser.id=:userId) "
            + "OR d.id IN (SELECT s.diary.id FROM Subscribe s WHERE s.userId=:userId) ) "
            + "AND ( (p.open=true "
            + "AND d.open=true )"
            + "OR d.writer=:userId) "
            + "order by p.createdAt desc ")
    Slice<Paper> getMainPagePaperByHs(@Param("userId") long userId, Pageable pageable);

    @Query("select p.id from Paper p join Heart h on h.contentsId=p.id where p in :papers and h.senderId=:userId and h.contentsCodeId=2")
    Set<Long> findHeartPaperByUserIdAAndDiaryIn(@Param("userId") long userId,
            @Param("papers") List<Paper> papers);
    Slice<Paper> findByContentContainingIgnoreCaseAndOpenTrueOrderByCreatedAtDesc(String query, Pageable pageable);

    @Query("select p from Paper p where p.id=:paperId")
    Optional<Paper> findByIdFetchPaperSymptom(@Param("paperId") long paperId);
    @Query("select p from Paper p where p.id=:paperId")
    Optional<Paper> findByIdFetchAll(@Param("paperId") long paperId);

    @Query("select c from Comment c where c.paperId=:paperId")
    List<Comment> findByIdFetchComments(@Param("paperId") long paperId);

    @Query("select i from Image i where i.paperId in :paperIds")
    List<Image> findImagesByPapers(@Param("paperIds") List<Long> diaryPapers);

    @Modifying
    @Query("Delete from Image i where i.paperId in :paperIds")
    void deleteImagesByPapers(@Param("paperIds") List<Long> diaryPapers);
}
