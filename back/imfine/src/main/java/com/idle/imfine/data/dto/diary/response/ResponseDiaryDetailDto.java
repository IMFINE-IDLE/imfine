package com.idle.imfine.data.dto.diary.response;


import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseDiaryDetailDto {
    private long userId;
    private int userStatus;
    private String uid;
    private String title;
    private String description;
    private String name;
    private List<ResponseMedicalListDto> medicals;
    private String beginDate;
    private String endedDate;
    private boolean isSubscribe;
    List<ResponseSymptomDto> diaryHasSymptoms;
}
