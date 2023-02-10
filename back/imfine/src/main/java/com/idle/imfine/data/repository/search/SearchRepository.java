package com.idle.imfine.data.repository.search;

import com.idle.imfine.data.entity.Search;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRepository extends JpaRepository<Search, Long> {
    List<Search> findBySearcherIdOrderByCreatedAtDesc(long searcherId);
    void deleteByIdAndAndSearcherId(long id, long searcherId);
}
