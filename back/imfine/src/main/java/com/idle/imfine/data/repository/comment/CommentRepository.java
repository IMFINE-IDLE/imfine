package com.idle.imfine.data.repository.comment;

import com.idle.imfine.data.entity.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
