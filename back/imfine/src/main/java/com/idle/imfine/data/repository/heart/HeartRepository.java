package com.idle.imfine.data.repository.heart;

import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.comment.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HeartRepository extends JpaRepository<Heart, Long> {

    boolean existsBySenderIdAndContentsCodeIdAndContentsId(long senderId, int contentsCodeId, long contentsId);

    void deleteBySenderIdAndContentsCodeIdAndContentsId(long id, int contentsCodeId, long contentsId);
    @Modifying
    @Query("delete from Heart h where h.contentsCodeId=:contentsCodeId and h.contentsId=:contentsId")
    void deleteHeartsByContentsCodeIdAndContentsId(@Param("contentsCodeId") int contentsCodeId, @Param("contentsId") long contentsId);

    @Modifying
    @Query("delete from Heart h where h.contentsCodeId=3 and h.contentsCodeId=:comments")
    void deleteByCommentsId(@Param("comments") List<Comment> comments);
}
