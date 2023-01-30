package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.data.dto.diary.request.RequestDiaryFilterDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryModifyDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.request.RequestDiarySubscribeDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(DiaryController.class);
    private final DiaryService diaryService;

    @PostMapping
    public ResponseEntity<String> postDiary(@RequestBody RequestDiaryPostDto requestDiaryPostDto, @LoginUser String uid){
        long savedId = diaryService.save(requestDiaryPostDto, uid);
        LOGGER.info("일기장 생성 api에 들어왔습니다. {}", savedId);
        return new ResponseEntity<>("일기장 생성 완료", HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getDiaryList(@RequestParam(value = "tab") String tab
        , @RequestParam(value = "medical-id") List<Integer> medicalId
        , @RequestParam(value = "symptom-id") List<Integer> symptomId
        , @RequestParam(value = "page") int page
        , @RequestParam(value = "size") int size){
        String sort = tab.equals("popular") ? "subscribeCount" : "postedAt";
        Pageable pageable = PageRequest.of(page, size, Direction.DESC, sort);
        LOGGER.info("왜 안되는 거지{}", pageable);
        return ResponseEntity.ok().body(diaryService.getDiaryList(RequestDiaryFilterDto.builder()
            .tab(tab)
            .medicalId(medicalId)
            .symptomId(symptomId)
            .build(),
            pageable));
    }

    @GetMapping("/{diary-id}")
    public ResponseEntity<ResponseDiaryDetailDto> getDiaryDetail(@PathVariable(value = "diary-id") long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 상세조회 api들어옴 {}", diaryId);
        ResponseDiaryDetailDto responseDiaryDetailDto = diaryService.getDiaryDetail(diaryId, uid);
        return new ResponseEntity<>(responseDiaryDetailDto, HttpStatus.OK);
    }

    @GetMapping("/{diary-id}/symptoms")
    public ResponseEntity<List<ResponseSymptomChartRecordDto>> getDiaryDetailSymptomRecords(@PathVariable(value = "diary-id") long diaryId) {
        return ResponseEntity.ok()
                .body(diaryService.getDiarySymptomsAll(diaryId));
    }

    @GetMapping("/{diary-id}/paper/{date}")
    public ResponseEntity<ResponsePaperDto> getPaper(@PathVariable(value = "diary-id") long diaryId
                                                    ,@PathVariable(value = "date") String date){
        ResponsePaperDto responsePaperDto = diaryService.getPaper(diaryId, date);
        return new ResponseEntity<>(responsePaperDto, HttpStatus.OK);
    }

    @PostMapping("/subscribe")
    public ResponseEntity<String> postDiarySubscribe(@RequestBody long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 구독 등록 api들어옴 {}", diaryId);

        diaryService.saveSubscribe(RequestDiarySubscribeDto.builder()
            .diaryId(diaryId)
            .uid(uid)
            .build());
        return new ResponseEntity<>("구독 등록", HttpStatus.OK);
    }
    
    @DeleteMapping("/{diary-id}/subscribe")
    public ResponseEntity<String> deleteDiarySubscribe(@PathVariable(value = "diary-id") long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 구독 삭제 api들어옴 {}", diaryId);
        diaryService.deleteSubscribe(RequestDiarySubscribeDto.builder()
            .diaryId(diaryId)
            .uid(uid)
            .build());
        return new ResponseEntity<>("구독 삭제", HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<String> putDiary(@RequestBody RequestDiaryModifyDto requestDiaryModifyDto, @LoginUser String uid) {
        diaryService.modifyDiary(requestDiaryModifyDto, uid);
        LOGGER.info("일기장 수정 api들어옴 {}", requestDiaryModifyDto);
        return new ResponseEntity<>("일기장 수정", HttpStatus.OK);
    }

    @DeleteMapping("/{diary-id}")
    public ResponseEntity<String> deleteDiary(@PathVariable(value = "diary-id") long diaryId, @LoginUser String uid) {
        LOGGER.info("일기장 삭제 api들어옴 {}", diaryId);
        diaryService.deleteDiary(diaryId, uid);
        return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
    }

    @PostMapping("/symptom")
    public ResponseEntity<String> postSymptom(@RequestBody RequestSymptomRegistrationDto requestSymptomRegistrationDto, @LoginUser String uid) {
        diaryService.addDairyHasSymptom(requestSymptomRegistrationDto, uid);
        LOGGER.info("일기장 증상 추가 api들어옴 {}", requestSymptomRegistrationDto);
        return new ResponseEntity<>("증상 추가 완료", HttpStatus.OK);
    }

    @DeleteMapping("/symptom/{symptom-id}")
    public ResponseEntity<String> deleteDiarySymptom(@PathVariable(value = "symptom-id") int diaryHasSymptomId, @LoginUser String uid) {
        LOGGER.info("일기장 증상 삭제 api들어옴 symptomid : {}", diaryHasSymptomId);
        diaryService.deleteDiaryHasSymptom(diaryHasSymptomId, uid);
        return new ResponseEntity<>("증상 삭제 완료", HttpStatus.OK);
    }
}
