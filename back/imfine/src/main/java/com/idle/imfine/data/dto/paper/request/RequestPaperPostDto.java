package com.idle.imfine.data.dto.paper.request;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestPaperPostDto {

    private long diaryId;
    private int userId;
    private String contents;
    private String date;
    private boolean open;
    private List<String> images;
    private List<RequestSymptomPaperDto> symptoms;
}
