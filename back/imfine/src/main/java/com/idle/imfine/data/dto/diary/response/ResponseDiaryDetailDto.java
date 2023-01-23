package com.idle.imfine.data.dto.diary.response;


import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDiaryDetailDto {
    private int userId;
    private int userStatus;
    private String userName;
    private String title;
    private String medicalName;
    private LocalDateTime beginDate;
    private LocalDateTime endedDate;

    List<ResponseSymptomRecordDto> symptomRecords;


}
