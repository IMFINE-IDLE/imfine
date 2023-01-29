package com.idle.imfine.data.dto.leaf.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseLeafDto {
    private int leafId;
    private String content;
    private int likeCount;
    private int declarationCount;
    private LocalDateTime createDate;
}
