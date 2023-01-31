package com.idle.imfine.data.dto.heart.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class RequestHeartDto {
    private long senderId;
    private int contentCodeId;
    private long contentId;

}
