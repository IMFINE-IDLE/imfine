package com.idle.imfine.service.diary;

import com.idle.imfine.data.dto.diary.request.RequestDiaryFilterDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryModifyDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.request.RequestDiarySubscribeDto;
import com.idle.imfine.data.dto.diary.request.RequestSymptomChartDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryPostPaper;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.diary.response.ResponsePutMedicalSymptomsDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.symptom.request.RequestSymptomRegistrationDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomScoreDto;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;

public interface DiaryService {
    long save(RequestDiaryPostDto diary, String uId);
    ResponseDiaryDetailDto getDiaryDetail(long diaryId, String uid);
    Map<String, List<ResponseSymptomScoreDto>> getDiarySymptomsAll(RequestSymptomChartDto requestDto);
    ResponsePaperDto getPaper(long diary, String date);
    void saveSubscribe(RequestDiarySubscribeDto requestDiarySubscribeDto);

    void deleteSubscribe(RequestDiarySubscribeDto build);

    List<ResponseDiaryListDto> getDiaryList(RequestDiaryFilterDto requestDiaryFilterDto, Pageable pageable);

    void modifyDiary(RequestDiaryModifyDto requestDiaryModifyDto, String uid);

    void deleteDiary(long diaryId, String uid);

    void addDairyHasSymptom(RequestSymptomRegistrationDto requestSymptomRegistrationDto, String uid);

    void deleteDiaryHasSymptom(int build, String uid);

    List<ResponseDiaryPostPaper> getMyDiaryList(String uid);

    ResponsePutMedicalSymptomsDto getDiaryMedicalAndSymptom(long diaryId, String uid);

    List<ResponseDiaryListDto> getDiarySubscribe(String uid);
}
