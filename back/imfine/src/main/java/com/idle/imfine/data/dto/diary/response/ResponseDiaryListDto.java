package com.idle.imfine.data.dto.diary.response;


import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDiaryListDto {
    private int diaryId;
    private int paperCount;
    private int subscribeCount;
    private String name;
    private String title;
    List<ResponseMedicalListDto> medicals;


}
