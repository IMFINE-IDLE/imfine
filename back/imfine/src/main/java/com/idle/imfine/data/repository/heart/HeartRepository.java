package com.idle.imfine.data.repository.heart;

import com.idle.imfine.data.entity.Heart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartRepository extends JpaRepository<Heart, Long> {

    boolean existsBySenderIdAndContentsCodeIdAndContentsId(long senderId, int contentsCodeId, long contentsId);

    void deleteBySenderIdAndContentsCodeIdAndContentsId(long id, int contentsCodeId, long contentsId);
}
