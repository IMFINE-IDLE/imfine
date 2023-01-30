package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.diary.request.RequestDiaryFilterDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryModifyDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.request.RequestDiarySubscribeDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.symptom.request.RequestSymptomRegistrationDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomChartRecordDto;
import com.idle.imfine.service.diary.DiaryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {
    private final ResponseService responseService;
    private static final Logger LOGGER = LoggerFactory.getLogger(DiaryController.class);
    private final DiaryService diaryService;

    @PostMapping
    public ResponseEntity<Result> postDiary(@RequestBody RequestDiaryPostDto requestDiaryPostDto, @LoginUser String uid){
        diaryService.save(requestDiaryPostDto, uid);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @GetMapping("/list")
    public ResponseEntity<Result> getDiaryList(@RequestParam(value = "tab") String tab
        , @RequestParam(value = "medical-id") List<Integer> medicalId
        , @RequestParam(value = "symptom-id") List<Integer> symptomId
        , @RequestParam(value = "page") int page
        , @RequestParam(value = "size") int size){
        String sort = tab.equals("popular") ? "subscribeCount" : "postedAt";
        Pageable pageable = PageRequest.of(page, size, Direction.DESC, sort);
        List<ResponseDiaryListDto> responseDto = diaryService.getDiaryList(RequestDiaryFilterDto.builder()
                        .tab(tab)
                        .medicalId(medicalId)
                        .symptomId(symptomId)
                        .build(),
                pageable);
        LOGGER.info("왜 안되는 거지{}", pageable);
        return ResponseEntity.ok().body(responseService.getSingleResult(responseDto));
    }

    @GetMapping("/{diary-id}")
    public ResponseEntity<Result> getDiaryDetail(@PathVariable(value = "diary-id") long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 상세조회 api들어옴 {}", diaryId);
        ResponseDiaryDetailDto resoponseDtos = diaryService.getDiaryDetail(diaryId, uid);
        return ResponseEntity.ok().body(responseService.getSingleResult(resoponseDtos));
    }

    @GetMapping("/{diary-id}/symptoms")
    public ResponseEntity<Result> getDiaryDetailSymptomRecords(@PathVariable(value = "diary-id") long diaryId) {
        List<ResponseSymptomChartRecordDto> resoponseDtos = diaryService.getDiarySymptomsAll(diaryId);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(resoponseDtos));
    }

    @GetMapping("/{diary-id}/paper/{date}")
    public ResponseEntity<Result> getPaper(@PathVariable(value = "diary-id") long diaryId
                                                    ,@PathVariable(value = "date") String date){
        ResponsePaperDto resoponseDtos = diaryService.getPaper(diaryId, date);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(resoponseDtos));
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Result> postDiarySubscribe(@RequestBody long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 구독 등록 api들어옴 {}", diaryId);

        diaryService.saveSubscribe(RequestDiarySubscribeDto.builder()
            .diaryId(diaryId)
            .uid(uid)
            .build());
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
    
    @DeleteMapping("/{diary-id}/subscribe")
    public ResponseEntity<Result> deleteDiarySubscribe(@PathVariable(value = "diary-id") long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 구독 삭제 api들어옴 {}", diaryId);
        diaryService.deleteSubscribe(RequestDiarySubscribeDto.builder()
            .diaryId(diaryId)
            .uid(uid)
            .build());
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping()
    public ResponseEntity<Result> putDiary(@RequestBody RequestDiaryModifyDto requestDiaryModifyDto, @LoginUser String uid) {
        diaryService.modifyDiary(requestDiaryModifyDto, uid);
        LOGGER.info("일기장 수정 api들어옴 {}", requestDiaryModifyDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/{diary-id}")
    public ResponseEntity<Result> deleteDiary(@PathVariable(value = "diary-id") long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 삭제 api들어옴 {}", diaryId);
        diaryService.deleteDiary(diaryId, uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/symptom")
    public ResponseEntity<Result> postSymptom(@RequestBody RequestSymptomRegistrationDto requestSymptomRegistrationDto, @LoginUser String uid) {
        diaryService.addDairyHasSymptom(requestSymptomRegistrationDto, uid);
        LOGGER.info("일기장 증상 추가 api들어옴 {}", requestSymptomRegistrationDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/symptom/{symptom-id}")
    public ResponseEntity<Result> deleteDiarySymptom(@PathVariable(value = "symptom-id") int diaryHasSymptomId, @LoginUser String uid) {
        LOGGER.info("일기장 증상 삭제 api들어옴 symptomid : {}", diaryHasSymptomId);
        diaryService.deleteDiaryHasSymptom(diaryHasSymptomId, uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
}
