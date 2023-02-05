package com.idle.imfine.service.comment;

import com.idle.imfine.data.dto.comment.request.RequestContentRegistraitionDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;

public interface CommentService {

    void save(RequestContentRegistraitionDto requestContentRegistraitionDto, String uid);

    void delete(long commentId, String uid);

    void postCommentLike(RequestHeartDto requestHeartDto, String uid);

    void deleteCommentLike(RequestHeartDto commentId, String uid);
}
