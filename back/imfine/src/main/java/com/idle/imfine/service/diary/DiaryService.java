package com.idle.imfine.service.diary;

import com.idle.imfine.data.dto.diary.request.RequestDiaryFilterDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryModifyDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.request.RequestDiarySubscribeDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.symptom.request.RequestSymptomRegistrationDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomChartRecordDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface DiaryService {
    void save(RequestDiaryPostDto diary, String uId);
    ResponseDiaryDetailDto getDiaryDetail(long diaryId, String uid);
    List<ResponseSymptomChartRecordDto> getDiarySymptomsAll(long diaryId);
    ResponsePaperDto getPaper(long diary, String date);
    void saveSubscribe(RequestDiarySubscribeDto requestDiarySubscribeDto);

    void deleteSubscribe(RequestDiarySubscribeDto build);

    List<ResponseDiaryListDto> getDiaryList(RequestDiaryFilterDto requestDiaryFilterDto, Pageable pageable);

    void modifyDiary(RequestDiaryModifyDto requestDiaryModifyDto, String uid);

    void deleteDiary(long diaryId, String uid);

    void addDairyHasSymptom(RequestSymptomRegistrationDto requestSymptomRegistrationDto, String uid);

    void deleteDiaryHasSymptom(int build, String uid);
}
