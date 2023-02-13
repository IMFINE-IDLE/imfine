package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Subscribe;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    boolean existsByDiaryAndUserId(Diary diary, long userId);
    void deleteByDiaryAndUserId(Diary diary, long userId);
    @Query("select d.id from Diary d join Subscribe s on s.diary=d where d in :diaries and s.userId=:userId")
    Set<Long> getDiaryIdsByDiaries(@Param("diaries") List<Diary> diaryPage, @Param("userId") long userId);

    @Modifying
    @Query("delete from Subscribe s where s.diary in :diary")
    void deleteByDiary(@Param("diary") Diary diaryId);
}
