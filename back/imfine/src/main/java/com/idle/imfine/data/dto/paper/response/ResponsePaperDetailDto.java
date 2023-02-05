package com.idle.imfine.data.dto.paper.response;

import com.idle.imfine.data.dto.comment.response.ResponseCommentDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
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
public class ResponsePaperDetailDto {
    private long diaryId;
    private long userId;
    private int userStatus;
    private int likeCount;
    private int commentCount;
    private String title;
    private String name;
    private String content;
    private String uid;
    private String createdAt;
    private String condition;
    private boolean myHeart;
    private List<ResponsePaperSymptomRecordDto> symptomList;
    private List<String> images;
    private List<ResponseCommentDto> comments;
}
