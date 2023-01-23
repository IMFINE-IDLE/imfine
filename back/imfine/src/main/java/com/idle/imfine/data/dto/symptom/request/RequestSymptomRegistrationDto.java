package com.idle.imfine.data.dto.symptom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestSymptomRegistrationDto {
    private int diaryId;
    private int symptomId;
}
