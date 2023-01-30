package com.idle.imfine.data.repository.leaf;

import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.leaf.Leaf;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeafRepository extends JpaRepository<Leaf, Integer> {
    List<Leaf> getByBamboo_Id(int bambooId);

    Page<Leaf> getByWriter_IdAndCreatedAtBetween(long id, LocalDateTime start, LocalDateTime end, Pageable pageable);
}
