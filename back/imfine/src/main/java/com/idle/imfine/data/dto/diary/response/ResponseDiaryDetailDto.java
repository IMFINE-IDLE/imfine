package com.idle.imfine.data.dto.diary.response;


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
    private String title;
    private String description;
    private String userName;
    private String medicalName;
    private String beginDate;
    private String endedDate;

    List<ResponseSymptomRecordDto> symptomRecords;


}
