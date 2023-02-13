package com.idle.imfine.data.dto.search.request;

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
public class RequestSearchDto {
    private String searcherId;
    private String query;
    public void setSearcherId(String searcherId) {
        this.searcherId = searcherId;
    }
}
