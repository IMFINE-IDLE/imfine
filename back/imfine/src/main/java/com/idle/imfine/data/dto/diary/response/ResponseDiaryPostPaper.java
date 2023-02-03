package com.idle.imfine.data.dto.diary.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDiaryPostPaper {
    private long diaryId;
    private String title;
}
