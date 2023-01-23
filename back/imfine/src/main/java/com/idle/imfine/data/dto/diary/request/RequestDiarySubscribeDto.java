package com.idle.imfine.data.dto.diary.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RequestDiarySubscribeDto {
    private int userId;
    private int diaryId;
}
