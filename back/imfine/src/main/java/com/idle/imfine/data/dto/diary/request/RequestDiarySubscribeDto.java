package com.idle.imfine.data.dto.diary.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class RequestDiarySubscribeDto {
    private String uid;
    private long diaryId;
}
