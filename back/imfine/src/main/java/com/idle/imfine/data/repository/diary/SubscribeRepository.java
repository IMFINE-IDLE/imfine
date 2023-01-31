package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Subscribe;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    boolean existsByDiaryAndUserId(Diary diary, long userId);
    void deleteByDiaryAndUserId(Diary diary, long userId);

}
