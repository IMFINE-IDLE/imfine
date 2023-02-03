package com.idle.imfine.data.repository.declaration;

import com.idle.imfine.data.entity.Declaration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeclarationRepository extends JpaRepository<Declaration, Long> {
    boolean existsByContentsCodeIdAndContentsIdAndSenderIdAndType
            (long contentsCodeId, long contentsId, long senderId, long type);
}
