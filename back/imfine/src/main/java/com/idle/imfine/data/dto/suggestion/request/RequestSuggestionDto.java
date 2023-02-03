package com.idle.imfine.data.dto.suggestion.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
public class RequestSuggestionDto {

    private String writerId;
    private long type;
    private String content;

    public void setWriterId(String writerId) {
        this.writerId = writerId;
    }
}
