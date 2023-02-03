package com.idle.imfine.data.dto.symptom.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestSymptomRegistrationDto {
    private long diaryId;
    private int symptomId;
}
