package com.idle.imfine.data.dto.comment.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseCommentDto {
    private long commentId;
    private long userId;
    private int likeCount;
    private int declarationCount;
    private String userName;
    private String content;
    private String createdDate;
    private boolean myHeart;
    private int userStatus;
}
