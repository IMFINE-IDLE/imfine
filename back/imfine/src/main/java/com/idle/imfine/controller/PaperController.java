package com.idle.imfine.controller;

import com.idle.imfine.common.LoginUser;
import com.idle.imfine.data.dto.comment.response.ResponseCommentDto;
import com.idle.imfine.data.dto.like.request.RequestHeartDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDto;
import com.idle.imfine.service.paper.PaperService;
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
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/paper")
public class PaperController {

    private final PaperService paperService;
    private static final Logger LOGGER = LoggerFactory.getLogger(PaperController.class);
    @PostMapping
    public ResponseEntity<String> postPaper(@RequestBody RequestPaperPostDto requestPaperPostDto, @LoginUser String uid){
        LOGGER.info("일기 생성 api 도착 {} {}", requestPaperPostDto, requestPaperPostDto.getSymptoms().get(0));
        paperService.save(requestPaperPostDto, uid);
        return new ResponseEntity<>("일기 생성 완료", HttpStatus.OK);
    }

    @GetMapping("/{paper-id}")
    public ResponseEntity<ResponsePaperDetailDto> getPaperDetail(@PathVariable(value = "paper-id") long paperId){
        if (true) {
            List<ResponsePaperSymptomRecordDto> symptoms = new ArrayList<>();
            List<String> images = new ArrayList<>();
            List<ResponseCommentDto> comments = new ArrayList<>();

            symptoms.add(new ResponsePaperSymptomRecordDto(1, "어지러움", 5));
            images.add("이미지url");
            comments.add(new ResponseCommentDto(1, 1, 1, 1, "유제제혁", "힘내세요!", LocalDateTime.now().format(
                DateTimeFormatter.ofPattern("yyyyMMddHHmmss")), 0));
            ResponsePaperDetailDto responsePaperDetailDto = new ResponsePaperDetailDto(1, 1, 1, "유제혁", "일기 내용", symptoms, images, comments);
            LOGGER.info("일기장 상세 조회 {}", responsePaperDetailDto);
            return new ResponseEntity<>(responsePaperDetailDto, HttpStatus.OK);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{paper-id}")
    public ResponseEntity<String> deletePaper(@PathVariable("paper-id") long paperId) {
        LOGGER.info("일기장 삭제 {}", paperId);
        return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<String> putPaper(@RequestBody RequestPaperPutDto requestPaperPutDto){
        requestPaperPutDto.setUserId(1);
        LOGGER.info("일기 수정 {}, {}", requestPaperPutDto, requestPaperPutDto.getSymptoms().get(0).getSymptomName());
        return new ResponseEntity<>("일기 수정 완료", HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ResponsePaperDto>> getPaperList() {
        if (true) {
            LOGGER.info("일기장 특정일 일기 조회 api.");
            List<String> images = new ArrayList<>();
            images.add("일기 사진 url");
            List<ResponsePaperSymptomRecordDto> records = new ArrayList<>();
            records.add(new ResponsePaperSymptomRecordDto(1, "어지러움", 10));
            List<ResponsePaperDto> responsePaperDtos = new ArrayList<>();
            ResponsePaperDto responsePaperDto = new ResponsePaperDto(1, 10, 10, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")), "행복함 경로", true, images, records);
            responsePaperDtos.add(responsePaperDto);
            return new ResponseEntity<>(responsePaperDtos, HttpStatus.OK);
        } else {
            return null;
        }
    }

    @PostMapping("/like")
    public ResponseEntity<String> postPaperLike(@RequestBody RequestHeartDto requestLikeDto) {
        requestLikeDto.setSenderId(1);
        requestLikeDto.setContentCodeId(2);
        LOGGER.info("일기 좋아요 {}", requestLikeDto);
        return new ResponseEntity<>("일기 좋아요 등록", HttpStatus.OK);
    }

    @DeleteMapping("/{paper-id}/like/{sender-id}")
    public ResponseEntity<String> deletePaperLike(@PathVariable(value = "paper-id") long paperId, @PathVariable(value = "sender-id") int senderId) {
        LOGGER.info("좋아요 취소 paperId {}, senderId {}", paperId, senderId);
        RequestHeartDto requestLikeDto = new RequestHeartDto(senderId, 1, (int)paperId);
        return new ResponseEntity("좋아요 취소", HttpStatus.OK);
    }
}
