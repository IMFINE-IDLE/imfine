package com.idle.imfine.data.dto.comment.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestContentRegistraitionDto {
    private Long paperId;
    private int userId;
    private String content;

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
