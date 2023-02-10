package com.idle.imfine.data.dto.symptom.response;

import javax.annotation.security.DenyAll;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseSymptomDto {
    private int symptomId;
    private String symptomName;
}
