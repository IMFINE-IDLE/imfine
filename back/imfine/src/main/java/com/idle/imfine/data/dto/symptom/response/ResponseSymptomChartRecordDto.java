package com.idle.imfine.data.dto.symptom.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSymptomChartRecordDto {
    private String symptomName;
    List<ResponseDateScoreDto> responseDateScoreDtos;
}
