package com.idle.imfine.data.dto.bamboo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseBamboo {
    private long bambooId;
    private String content;
    private long remainTime;
    private int likeCount;
    private int leafCount;
    private boolean isHeart;
    private boolean hasNext;

}
