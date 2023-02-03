package com.idle.imfine.data.dto.medical.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseMedicalListDto {
     private int medicalId;
     private String medicalName;
}
