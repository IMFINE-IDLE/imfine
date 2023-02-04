package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Page<Diary> findAllByOpen(Pageable pageable);
    Page<Diary> findByOpenOrMedicalCodeInAndOpenAndDiaryHasSymptomsIn(List<MedicalCode> medicalCode,
        List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);
    Page<Diary> findByDiaryHasSymptomsInAndOpen(List<DiaryHasSymptom> diaryHasSymptom, Pageable pageable);
    Page<Diary> findByMedicalCodeInAndOpen(List<MedicalCode> medicalCode, Pageable pageable);
    Optional<Diary> findByIdAndWriter(long diaryId, User user);
    List<Diary> findAllByWriterIn(List<User> users);
    List<Diary> findAllByWriter(User writer);
    @Query("select distinct d from Diary d join fetch Paper p on p.diary=d join fetch d.diaryHasSymptoms Where d.id=:diaryId")
    Optional<Diary> findDiaryByIdFetchPaper(@Param("diaryId") long diaryId);
    @Query("select distinct d from Diary d join fetch d.diaryHasSymptoms join fetch d.writer join fetch d.medicalCode where d.id=:diaryId")
    Optional<Diary> findDiaryByIdFetchDetail(@Param("diaryId") long diaryId);
    @Query("SELECT distinct d FROM Diary d join fetch Subscribe s on d=s.diary where s.userId=:id")
    List<Diary> findAllByUserId(@Param("id") long id);
    @Query("select distinct d from Diary d join fetch DiaryHasSymptom s on d=s.diary where d.id=:diaryId")
    Optional<Diary> findByFetchSymptom(@Param("diaryId") long diaryId);
}
