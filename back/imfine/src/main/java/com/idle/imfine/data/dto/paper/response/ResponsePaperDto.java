package com.idle.imfine.data.dto.paper.response;

import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePaperDto {
    private long diaryId;
    private String title;
    private long paperId;
    private String uid;
    private String name;
    private String content;
    private int commentCount;
    private int likeCount;
    private LocalDate date;
    private String condition;
    private boolean myHeart;
    private boolean open;
    private String createdAt;
    List<String> images;
    List<ResponsePaperSymptomRecordDto> symptomList;
}
