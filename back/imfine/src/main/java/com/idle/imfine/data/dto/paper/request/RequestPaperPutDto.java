package com.idle.imfine.data.dto.paper.request;

import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestPaperPutDto {
    private long paperId;
    private String contents;
    private boolean open;
    private List<ResponseSymptomRecordDto> symptomList;
    private List<MultipartFile> putImages;
    private List<Long> removeImages;
}
