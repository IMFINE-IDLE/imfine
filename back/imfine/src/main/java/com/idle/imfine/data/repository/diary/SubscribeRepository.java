package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    boolean existsByDiaryAndUserId(Diary diary, long userId);
    void deleteByDiaryAndUserId(Diary diary, long userId);
}
