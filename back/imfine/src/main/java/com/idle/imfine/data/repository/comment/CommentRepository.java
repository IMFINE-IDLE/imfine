package com.idle.imfine.data.repository.comment;

import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c join Heart h on h.contentsId=c.id Where c.paperId=:paperId and h.contentsCodeId=:codeId and c.writer=:user")
    List<Comment> findCommentByHeartAndPaperIn(@Param("paperId") long paperId,
            @Param("codeId") int codeId, @Param("user") User user);

    @Query("SELECT c from Comment c join fetch c.writer where c.paperId=:paperId")
    List<Comment> findCommentsByFetchWriterAndPaperId(@Param("paperId") long paperId);
}
