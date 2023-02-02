package com.idle.imfine.data.repository.leaf;

import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.leaf.Leaf;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LeafRepository extends JpaRepository<Leaf, Long> {
    List<Leaf> getByBamboo_Id(long bambooId);

    List<Leaf> getByWriter_IdAndCreatedAtBetween(long id, LocalDateTime start, LocalDateTime end);

    @Query("select l from Leaf l join Heart h on l.id = h.contentsId where h.contentsCodeId = 5 and h.senderId = :senderId")
    List<Leaf> findByHeartList(@Param("senderId") long senderId);
    @Modifying
    @Query("delete from Leaf l where l.bamboo in :bamboo")
    void deleteLeavesBy(@Param("bamboo") List<Bamboo> bamboos);

}
