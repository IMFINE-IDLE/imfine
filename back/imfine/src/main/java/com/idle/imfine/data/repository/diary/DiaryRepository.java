package com.idle.imfine.data.repository.diary;

import com.idle.imfine.data.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
}
