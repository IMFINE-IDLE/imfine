package com.idle.imfine.data.dto.comment.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCommentDto {
    private long commentId;
    private int userId;
    private int likeCount;
    private int declarationCount;
    private String userName;
    private String content;
    private String createdDate;
    private int userStatus;
}
