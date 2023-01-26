package com.idle.imfine.data.dto.paper.response;

import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePaperDto {
    private int paperId;
    private int commentCount;
    private int likeCount;
    private String date;
    private String condition;
    private boolean open;
    List<String> images;
    List<ResponsePaperSymptomRecordDto> responseSymptomRecordDtos;
}
