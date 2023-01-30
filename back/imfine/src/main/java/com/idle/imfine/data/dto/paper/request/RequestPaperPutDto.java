package com.idle.imfine.data.dto.paper.request;

import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestPaperPutDto {
    private long paperId;
    private String contents;
    private boolean open;
    private List<ResponseSymptomRecordDto> symptoms;
    private List<String> images;
}
