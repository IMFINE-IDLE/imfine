package com.idle.imfine.data.repository.bamboo;

import com.idle.imfine.data.entity.bamboo.Bamboo;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BambooRepository extends JpaRepository<Bamboo, Integer> {

    //최신순 정렬
    List<Bamboo> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);
    //오래된순 정렬
    List<Bamboo> findByCreatedAtBetweenOrderByCreatedAtAsc(LocalDateTime start, LocalDateTime end);

    //인기순 정렬
    List<Bamboo> findByCreatedAtBetweenOrderByLikeCountDesc(LocalDateTime start, LocalDateTime end);


}
