package com.idle.imfine.data.dto.diary.response;

import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePutMedicalSymptomsDto {

    private ResponseMedicalListDto medical;
    private List<ResponseSymptomDto> symptomList;
}
