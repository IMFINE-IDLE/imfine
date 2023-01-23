package com.idle.imfine.data.dto.like.request;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Setter
public class RequestLikeDto {
    private int senderId;
    private int contentsCodeId;
    private int contentsId;

}
