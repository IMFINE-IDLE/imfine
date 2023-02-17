package com.idle.imfine.service.comment;

import com.idle.imfine.data.dto.comment.request.RequestContentRegistraitionDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;

public interface CommentService {

    ResponseNotificationPost save(RequestContentRegistraitionDto requestContentRegistraitionDto, String uid);

    void delete(long commentId, String uid);

    ResponseNotificationPost postCommentLike(RequestHeartDto requestHeartDto, String uid);

    void deleteCommentLike(RequestHeartDto requestHeartDto, String uid);
}
