package com.idle.imfine.service.diary;

import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomChartRecordDto;
import java.util.List;
import java.util.Map;

public interface DiaryService {
    long save(RequestDiaryPostDto diary, String uId);
    ResponseDiaryDetailDto getDiaryDetail(long diaryId, String uid);
    List<ResponseSymptomChartRecordDto> getDiarySymptomsAll(long diaryId);
}
