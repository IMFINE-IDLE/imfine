package com.idle.imfine.data.dto.leaf.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseLeafDto {
    private int leafId;
    private String content;
    private int likeCount;
    private int declarationCount;
    private LocalDateTime createDate;
}
