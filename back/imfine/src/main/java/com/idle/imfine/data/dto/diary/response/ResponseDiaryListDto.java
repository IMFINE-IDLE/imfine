package com.idle.imfine.data.dto.diary.response;


import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseDiaryListDto {
    private long diaryId;
    private int paperCount;
    private int subscribeCount;
    private String medicalName;
    private String image;
    private String name;
    private String title;
    private boolean mySubscribe;
    private boolean open;
    private boolean hasNext;
}
