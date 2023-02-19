package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    List<Diary> findAllByWriter(User writer);

    Slice<Diary> findByTitleContainingIgnoreCaseAndOpenTrueOrderByCreatedAtDesc(String query, Pageable pageable);

    @Query("select distinct d from Diary d "
            + "join d.writer "
            + "where d.id=:diaryId and d.writer=:user")
    Optional<Diary> findByIdAndWriter(@Param("diaryId") long diaryId, @Param("user") User user);

    @Query("select d from Diary d")
    Slice<Diary> findAllByOpenTrue(Pageable pageable);

    @Query("select distinct d from Diary d "
            + "join MedicalCode m  on d.medicalCode=m "
            + "join DiaryHasSymptom dhs on dhs.diary=d "
            + "where dhs in :diaryHasSymptom or m in :medicalCode")
    Slice<Diary> findByOpenTrueOrMedicalCodeInAndOpenTrueOrDiaryHasSymptomsIn(@Param("medicalCode") List<MedicalCode> medicalCode,
            @Param("diaryHasSymptom") List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);

    @Query("select distinct d from Diary d "
            + "join DiaryHasSymptom dhs "
            + "on dhs.diary=d "
            + "where dhs in :diaryHasSymptom")
    Slice<Diary> findByDiaryHasSymptomsInAndOpenTrue(
            @Param("diaryHasSymptom") List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);

    @Query("select distinct d from Diary d "
            + "join MedicalCode m on m=d.medicalCode "
            + "where m in :medicalCode")
    Slice<Diary> findByMedicalCodeInAndOpenTrue(@Param("medicalCode") List<MedicalCode> medicalCode,
            Pageable pageable);

    @Query("select distinct d from MedicalCode m "
            + "join fetch Diary d on d.medicalCode=m "
            + "where d.writer=:writer")
    List<Diary> findByDiaryFetchMedicalCode(@Param("writer") User writer);

    @Query("select distinct d from Diary d "
            + "join fetch d.writer "
            + "join fetch d.medicalCode where d.id=:diaryId")
    Optional<Diary> findDiaryByIdFetchDetail(@Param("diaryId") long diaryId);

    @Query("select distinct d from Diary d "
            + "join fetch DiaryHasSymptom s "
            + "on d=s.diary "
            + "where d.id=:diaryId")
    Optional<Diary> findByFetchSymptom(@Param("diaryId") long diaryId);

    @Query("select distinct d from Diary d "
            + "join fetch d.writer "
            + "join fetch d.medicalCode "
            + "join Subscribe s on s.diary=d "
            + "where s.userId=:userId")
    List<Diary> findAllByWriterAndSubscribe(@Param("userId") long userId);

    @Query("select distinct d from Diary d "
            + "join fetch Paper p on p.diary=d  "
            + "Where d.id=:diaryId "
            + "and p.date between :startDate and :endDate")
    Optional<Diary> findDiaryByIdFetchPaper(@Param("diaryId") long diaryId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT distinct d FROM Diary d "
            + "join fetch Subscribe s on d=s.diary "
            + "where s.userId=:id")
    List<Diary> findAllByUserId(@Param("id") long id);

    @Query("Select c from Diary d "
            + "join d.papers p "
            + "join p.comments c "
            + "where d=:diary")
    List<Comment> findDiaryComments(@Param("diary") Diary diary);

    @Query("Select p from Diary d "
            + "join d.papers p "
            + "where d=:diary ")
    List<Paper> findPaperByDiaryFetchPaper(@Param("diary") Diary diary);


    @Modifying
    @Query("delete from Heart h "
            + "where h.contentsCodeId=3 "
            + "and h.contentsId in :comments ")
    void deleteCommentsHeart(@Param("comments") List<Long> comments);

    @Modifying
    @Query("delete from Comment c where c in :comments ")
    void deleteComments(@Param("comments") List<Comment> comments);

    @Modifying
    @Query("delete from PaperHasSymptom phs where phs.paper in :papers ")
    void deletePaperHasSymptom(@Param("papers") List<Paper> diaryPapers);

    @Modifying
    @Query("delete from Paper p where p.diary in :diary ")
    void deletePapers(@Param("diary") Diary diary);

    @Modifying
    @Query("delete from Heart h "
            + "where h.contentsId in :paperIds "
            + "and h.contentsCodeId = 2 ")
    void deletePapersHeart(@Param("paperIds") List<Long> diaryPapers);


    @Modifying
    @Query("delete from DiaryHasSymptom dhs Where dhs.diary = :diary ")
    void deleteDiaryHasSymptomByDiary(@Param("diary") Diary diary);
}
