package com.idle.imfine.data.dto.paper.response;

import com.idle.imfine.data.dto.image.ResponseModifyImageDto;
import com.idle.imfine.data.dto.symptom.response.ResponsePaperHasSymptomDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseModifyPaperDto {

    private long diaryId;
    private String title;

    private long paperId;
    private String content;
    private boolean open;
    private List<ResponsePaperHasSymptomDto> symptoms;
    private List<ResponseModifyImageDto> images;
}
