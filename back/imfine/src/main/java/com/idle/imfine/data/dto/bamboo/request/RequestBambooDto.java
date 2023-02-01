package com.idle.imfine.data.dto.bamboo.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestBambooDto {
    private String content;
    private String writerId;

    public void setWriterId(String writerId) {
        this.writerId = writerId;
    }
}
