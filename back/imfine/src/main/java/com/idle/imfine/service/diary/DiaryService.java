package com.idle.imfine.service.diary;

import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;

public interface DiaryService {
    long save(RequestDiaryPostDto diary, String uId);
    ResponseDiaryDetailDto getDiaryDetail(long diaryId, String uid);
}
