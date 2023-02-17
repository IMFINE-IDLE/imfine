package com.idle.imfine.data.repository.bamboo;

import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.leaf.Leaf;
import java.util.List;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BambooRepository extends JpaRepository<Bamboo, Long> {

    //최신순 정렬
    Slice<Bamboo> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);
    //오래된순 정렬
    Slice<Bamboo> findByCreatedAtBetweenOrderByCreatedAtAsc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    //인기순 정렬
    Slice<Bamboo> findByCreatedAtBetweenOrderByLikeCountDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    //내가 작성한 글
    Slice<Bamboo> findByWriter_IdAndCreatedAtBetweenOrderByCreatedAtDesc(long writerId, LocalDateTime start, LocalDateTime end, Pageable pageable);

    @Query("select b from Bamboo b inner join Heart h on b.id = h.contentsId "
            + "where h.contentsCodeId = 4 and h.senderId = :writerId and b.createdAt between :start and :end "
            + "order by b.createdAt desc ")
    Slice<Bamboo> findByHeart(@Param("writerId") long writerId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end, Pageable pageable);

    @Query("select b from Bamboo b join Heart h on b.id = h.contentsId "
            + "where h.contentsCodeId = 4 and h.senderId = :senderId and b.createdAt between :start and :end "
            + "order by b.createdAt desc ")
    List<Bamboo> findByHeartList(@Param("senderId") long senderId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    List<Bamboo> findByDeleteAtBefore(LocalDateTime now);

    @Modifying
    @Query("delete from Bamboo b where b.deleteAt < :now")
    void deleteByDeleteAtBefore(@Param("now") LocalDateTime now);

    @Query("select distinct b from Bamboo b join Leaf l on l.bamboo=b where l.writer.id=:writerId and b.createdAt between :start and :end")
    Page<Bamboo> findByLeaves(@Param("writerId") long writerId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end, Pageable pageable);
}
