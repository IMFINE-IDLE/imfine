package com.idle.imfine.data.repository.bamboo;

import com.idle.imfine.data.entity.bamboo.Bamboo;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BambooRepository extends JpaRepository<Bamboo, Integer> {

    //최신순 정렬
    Page<Bamboo> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);
    //오래된순 정렬
    Page<Bamboo> findByCreatedAtBetweenOrderByCreatedAtAsc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    //인기순 정렬
    Page<Bamboo> findByCreatedAtBetweenOrderByLikeCountDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    //내가 작성한 글
    Page<Bamboo> findByWriter_IdAndCreatedAtBetween(long writerId, LocalDateTime start, LocalDateTime end, Pageable pageable);

    @Query("select b from Bamboo b inner join Heart h on b.id = h.contentsId where h.senderId = :writerId and b.createdAt between :start and :end")
    Page<Bamboo> findByHeart(@Param("writerId") long writerId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end, Pageable pageable);

}
