package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    @Query("select d from Diary d")
    Slice<Diary> findAllByOpenTrue(Pageable pageable);
    @Query("select distinct d from Diary d join MedicalCode m  on d.medicalCode=m join DiaryHasSymptom dhs on dhs.diary=d where dhs in :diaryHasSymptom or m in :medicalCode")
    Slice<Diary> findByOpenTrueOrMedicalCodeInAndOpenTrueOrDiaryHasSymptomsIn(@Param("medicalCode") List<MedicalCode> medicalCode,
            @Param("diaryHasSymptom") List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);
    @Query("select distinct d from Diary d join DiaryHasSymptom dhs on dhs.diary=d where dhs in :diaryHasSymptom")
    Slice<Diary> findByDiaryHasSymptomsInAndOpenTrue(@Param("diaryHasSymptom") List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);
    @Query("select distinct d from Diary d join MedicalCode m on m=d.medicalCode where m in :medicalCode")
    Slice<Diary> findByMedicalCodeInAndOpenTrue(@Param("medicalCode") List<MedicalCode> medicalCode, Pageable pageable);
    Optional<Diary> findByIdAndWriter(long diaryId, User user);
    List<Diary> findAllByWriterIn(List<User> users);
    List<Diary> findAllByWriter(User writer);
    @Query("select distinct d from MedicalCode m join fetch Diary d on d.medicalCode=m where d.writer=:writer")
    List<Diary> findByDiaryFetchMedicalCode(@Param("writer") User writer);
    @Query("select distinct d from Diary d join fetch Paper p on p.diary=d  Where d.id=:diaryId and p.date between :startDate and :endDate")
    Optional<Diary> findDiaryByIdFetchPaper(@Param("diaryId") long diaryId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query("select distinct d from Diary d join fetch d.writer join fetch d.medicalCode where d.id=:diaryId")
    Optional<Diary> findDiaryByIdFetchDetail(@Param("diaryId") long diaryId);
    @Query("SELECT distinct d FROM Diary d join fetch Subscribe s on d=s.diary where s.userId=:id")
    List<Diary> findAllByUserId(@Param("id") long id);
    @Query("select distinct d from Diary d join fetch DiaryHasSymptom s on d=s.diary where d.id=:diaryId")
    Optional<Diary> findByFetchSymptom(@Param("diaryId") long diaryId);
    @Query("select distinct d from Diary d join fetch d.writer join fetch d.medicalCode join Subscribe s on s.diary=d where d.writer=:user")
    List<Diary> findAllByWriterAndSubscribe(@Param("user") User user);
    Slice<Diary> findByTitleContainingIgnoreCaseAndOpenTrue(String query, Pageable pageable);
}
