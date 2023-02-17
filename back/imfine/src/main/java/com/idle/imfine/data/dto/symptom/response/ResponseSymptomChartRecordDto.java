package com.idle.imfine.data.dto.symptom.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseSymptomChartRecordDto {
    private String date;
    List<ResponseSymptomScoreDto> symptoms;
}
