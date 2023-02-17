package com.idle.imfine.data.dto.diary.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class RequestSymptomChartDto {
    private long diaryId;
    private String date;
    private String filter;
}
