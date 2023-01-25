package com.idle.imfine.data.dto.like.request;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
public class RequestLikeDto {
    private int senderId;
    private int contentCodeId;
    private int contentId;

}
