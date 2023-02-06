package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import com.idle.imfine.service.paper.PaperService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/paper")
public class PaperController {

    private final PaperService paperService;
    private final ResponseService responseService;
    private static final Logger LOGGER = LoggerFactory.getLogger(PaperController.class);
    @PostMapping
    public ResponseEntity<Result> postPaper(@ModelAttribute RequestPaperPostDto requestPaperPostDto, @LoginUser String uid){
        LOGGER.info("일기 생성 api 도착 {} {}", requestPaperPostDto);
        try {
            paperService.save(requestPaperPostDto, uid);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @GetMapping("/{paper-id}")
    public ResponseEntity<Result> getPaperDetail(@PathVariable(value = "paper-id") long paperId, @LoginUser String uid){
        ResponsePaperDetailDto responseDto = paperService.getPaperDetail(paperId, uid);
        return ResponseEntity.ok().body(responseService.getSingleResult(responseDto));
    }

    @DeleteMapping("/{paper-id}")
    public ResponseEntity<Result> deletePaper(@PathVariable("paper-id") long paperId, @LoginUser String uid) {
        LOGGER.info("일기장 삭제 {}", paperId);
        paperService.delete(paperId, uid);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @PutMapping
    public ResponseEntity<Result> putPaper(@RequestBody RequestPaperPutDto requestPaperPutDto, @LoginUser String uid){
        paperService.modifyPaper(requestPaperPutDto, uid);
        LOGGER.info("일기 수정 {}, {}", requestPaperPutDto, requestPaperPutDto.getSymptomList().get(0).getSymptomId());
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @GetMapping("/list")
    public ResponseEntity<Result> getPaperList(@LoginUser String uid, @PageableDefault(sort = "date", direction = Direction.DESC, size = 10) Pageable pageable) {
        List<ResponsePaperDto> responseDto = paperService.getPaperList(uid, pageable);
        return ResponseEntity.ok().body(responseService.getListResult(responseDto));
    }

    @PostMapping("/like")
    public ResponseEntity<Result> postPaperLike(@RequestBody RequestHeartDto requestLikeDto, @LoginUser String uid) {
        requestLikeDto.setContentCodeId(2);
        paperService.postPaperLike(requestLikeDto, uid);
        LOGGER.info("일기 좋아요 {}", requestLikeDto);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @DeleteMapping("/{paper-id}/like")
    public ResponseEntity<Result> deletePaperLike(@PathVariable(value = "paper-id") long paperId, @LoginUser String uid) {
        paperService.deletePaperLike(RequestHeartDto.builder()
                        .contentId(paperId)
                        .contentCodeId(2)
                        .build()
                , uid);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

}
