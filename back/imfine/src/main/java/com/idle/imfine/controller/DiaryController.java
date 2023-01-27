package com.idle.imfine.controller;

import com.idle.imfine.common.LoginUser;
import com.idle.imfine.data.dto.diary.request.RequestDiaryModifyDto;
import com.idle.imfine.data.dto.diary.request.RequestDiarySubscribeDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryFilterDto;
import com.idle.imfine.data.dto.diary.request.RequestDiaryPostDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryDetailDto;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.data.dto.symptom.request.RequestSymptomRegistrationDto;
import com.idle.imfine.data.dto.symptom.response.ResponseDateScoreDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomChartRecordDto;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomRecordDto;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.service.diary.DiaryService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        , @RequestParam(value = "symptom-id") List<Integer> symptomId){

        RequestDiaryFilterDto requestDiaryFilterDto = new RequestDiaryFilterDto(tab, medicalId, symptomId);
        if (requestDiaryFilterDto == null){
            LOGGER.info("일기장 목록 조회 api에 들어왔습니다. {}", requestDiaryFilterDto);

            List<ResponseDiaryListDto> li = new ArrayList<>();
            List<ResponseMedicalListDto> mLi = new ArrayList<>();
            mLi.add(new ResponseMedicalListDto(1, "백혈병"));
            mLi.add(new ResponseMedicalListDto(2, "라식"));
            mLi.add(new ResponseMedicalListDto(3, "라섹"));
            li.add(new ResponseDiaryListDto(1, 10, 100,"나는유저", "나는일기",  mLi));

            List<ResponseMedicalListDto> mLi2 = new ArrayList<>();
            mLi2.add(new ResponseMedicalListDto(4, "폐암"));
            li.add(new ResponseDiaryListDto(2, 5, 50,"유제혁", "암일기",  mLi2));

            List<ResponseMedicalListDto> mLi3 = new ArrayList<>();
            mLi3.add(new ResponseMedicalListDto(5, "감기"));
            li.add(new ResponseDiaryListDto(3, 1, 1,"제혁", "감기일기",  mLi3));
            return new ResponseEntity<>(li, HttpStatus.OK);
        } else if (true) {
            LOGGER.info("일기장 목록 조회 api에 들어왔습니다. 필터링 입니다. \n{}", requestDiaryFilterDto);
            List<ResponseDiaryListDto> li = new ArrayList<>();
            List<ResponseMedicalListDto> mLi = new ArrayList<>();
            mLi.add(new ResponseMedicalListDto(1, "백혈병"));
            mLi.add(new ResponseMedicalListDto(2, "라식"));
            mLi.add(new ResponseMedicalListDto(3, "라섹"));
            li.add(new ResponseDiaryListDto(1, 10, 100,"나는유저", "나는일기",  mLi));

            List<ResponseMedicalListDto> mLi2 = new ArrayList<>();
            mLi2.add(new ResponseMedicalListDto(4, "폐암"));
            li.add(new ResponseDiaryListDto(2, 5, 50,"유제혁", "암일기",  mLi2));

            List<ResponseMedicalListDto> mLi3 = new ArrayList<>();
            mLi3.add(new ResponseMedicalListDto(5, "감기"));
            li.add(new ResponseDiaryListDto(3, 1, 1,"제혁", "감기일기",  mLi3));
            return new ResponseEntity<>(li, HttpStatus.OK);
        } else{
            return null;
        }
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
        if (true) {
            LOGGER.info("일기장 특정일 일기 조회 api. diaryid : {}, date : {}", diaryId, date);
            List<String> images = new ArrayList<>();
            images.add("일기 사진 url");
            List<ResponsePaperSymptomRecordDto> records = new ArrayList<>();
            records.add(ResponsePaperSymptomRecordDto.builder()
                            .symptomId(1)
                            .symptomName("어지러움")
                            .score(10)
                            .build());
            ResponsePaperDto responsePaperDto = new ResponsePaperDto(1, 10, 10, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")), "행복함 경로", true, images, records);

            return new ResponseEntity<>(responsePaperDto, HttpStatus.OK);
        } else {
            return null;
        }
    }

    @PostMapping("/subscribe")
    public ResponseEntity<String> postDiarySubscribe(@RequestBody long diaryId) {
        LOGGER.info("일기장 구독 등록 api들어옴 {}", diaryId);
        RequestDiarySubscribeDto requestDiarySubscribeDto = new RequestDiarySubscribeDto(1, diaryId);
        return new ResponseEntity<>("구독 등록", HttpStatus.OK);
    }
    
    @DeleteMapping("/{diary-id}/subscribe")
    public ResponseEntity<String> deleteDiarySubscribe(@PathVariable(value = "diary-id") long diaryId) {
        LOGGER.info("일기장 구독 삭제 api들어옴 {}", diaryId);
        RequestDiarySubscribeDto requestDiarySubscribeDto = new RequestDiarySubscribeDto(1, diaryId);
        return new ResponseEntity<>("구독 삭제", HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<String> putDiary(@RequestBody RequestDiaryModifyDto requestDiaryModifyDto) {
        requestDiaryModifyDto.setUserId(1);
        LOGGER.info("일기장 수정 api들어옴 {}", requestDiaryModifyDto);
        return new ResponseEntity<>("일기장 수정", HttpStatus.OK);
    }

    @DeleteMapping("/{diary-id}")
    public ResponseEntity<String> deleteDiary(@PathVariable(value = "diary-id") long diaryId) {
        LOGGER.info("일기장 삭제 api들어옴 {}", diaryId);
        return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
    }

    @PostMapping("/symptom")
    public ResponseEntity<String> postSymptom(@RequestBody RequestSymptomRegistrationDto requestSymptomRegistrationDto) {
        LOGGER.info("일기장 증상 추가 api들어옴 {}", requestSymptomRegistrationDto);
        return new ResponseEntity<>("증상 추가 완료", HttpStatus.OK);
    }

    @DeleteMapping("/{diary-id}/symptom/{symptom-id}")
    public ResponseEntity<String> deleteDiarySymptom(@PathVariable(value = "diary-id") long diaryId, @PathVariable(value = "symptom-id") int symptomId) {
        LOGGER.info("일기장 증상 삭제 api들어옴 diaryid : {}, symptomid : {}", diaryId, symptomId);
        return new ResponseEntity<>("증상 삭제 완료", HttpStatus.OK);
    }
}
