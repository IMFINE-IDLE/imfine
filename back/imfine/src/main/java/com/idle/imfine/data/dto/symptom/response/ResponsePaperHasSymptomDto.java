package com.idle.imfine.data.dto.symptom.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponsePaperHasSymptomDto {
    private long symptomId;
    private String symptomName;
    private int score;
}
