package com.idle.imfine.data.dto.symptom.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseSymptomRecordDto {
    protected Long symptomId;
    protected int score;
}
