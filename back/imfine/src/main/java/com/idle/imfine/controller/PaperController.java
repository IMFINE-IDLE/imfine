package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponseMainPage;
import com.idle.imfine.data.dto.paper.response.ResponseModifyPaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.errors.code.ImageErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.FileStore;
import com.idle.imfine.service.notification.NotificationService;
import com.idle.imfine.service.paper.PaperService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/paper")
public class PaperController {

    private final PaperService paperService;
    private final NotificationService notificationService;
    private final ResponseService responseService;
    private final FileStore fileStore;
    private static final Logger LOGGER = LoggerFactory.getLogger(PaperController.class);
    @PostMapping
    public ResponseEntity<Result> postPaper(@ModelAttribute RequestPaperPostDto requestPaperPostDto, @LoginUser String uid){
        LOGGER.info("일기 생성 api 도착 userId: {} diaryId: {}", uid, requestPaperPostDto.getDiaryId());
        if (requestPaperPostDto.getImages() != null && requestPaperPostDto.getImages().size() > 4) {
            throw new ErrorException(ImageErrorCode.REQUEST_IMAGE_TOO_LARGE);
        }
        long paperId = -1;
        try {
            paperId = paperService.save(requestPaperPostDto, uid);
        } catch (IOException e) {
            throw new ErrorException(ImageErrorCode.IMAGE_SAVE_CONFLICT);
        }
        return ResponseEntity.ok().body(responseService.getSingleResult(paperId));
    }

    @GetMapping("/{paper-id}")
    public ResponseEntity<Result> getPaperDetail(@PathVariable(value = "paper-id") long paperId, @LoginUser String uid){
        LOGGER.info("일기 상세 정보 api paperId: {}", paperId);
        ResponsePaperDetailDto responseDto = paperService.getPaperDetail(paperId, uid);
        return ResponseEntity.ok().body(responseService.getSingleResult(responseDto));
    }

    @DeleteMapping("/{paper-id}")
    public ResponseEntity<Result> deletePaper(@PathVariable("paper-id") long paperId, @LoginUser String uid) {
        LOGGER.info("일기장 삭제 {}", paperId);
        paperService.delete(paperId, uid);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @GetMapping("/modify/{paper-id}")
    public ResponseEntity<Result> getModifyPaper(@LoginUser String uid,
            @PathVariable("paper-id") long paperId) {

        LOGGER.info("일기장 삭제 수정 정보 api paperId: {}", paperId);
        ResponseModifyPaperDto responseDto = paperService.getModifyPaper(uid, paperId);
        return ResponseEntity.ok().body(responseService.getSingleResult(responseDto));
    }

    @PutMapping
    public ResponseEntity<Result> putPaper(@ModelAttribute RequestPaperPutDto requestPaperPutDto, @LoginUser String uid){
        LOGGER.info("일기 수정 paperId: {}, uid: {}", requestPaperPutDto.getPaperId(), uid);

        try {
            List<String> removeImages = paperService.modifyPaper(requestPaperPutDto, uid);
            fileStore.deleteImages(removeImages);
        } catch (IOException e) {
            throw new ErrorException(ImageErrorCode.IMAGE_SAVE_CONFLICT);
        }
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @GetMapping("/list")
    public ResponseEntity<Result> getPaperList(@LoginUser String uid, @RequestParam("page") int page, @RequestParam("tab") String filter) {
        Pageable pageable = PageRequest.of(page, 10, Direction.DESC, filter);
        LOGGER.info("일기 목록 api (메인페이지) : uid: {},  pageable: {}", uid ,pageable);
        ResponseMainPage responseDto = paperService.getPaperList(uid, pageable);
        return ResponseEntity.ok().body(responseService.getSingleResult(responseDto));
    }

    @PostMapping("/like")
    public ResponseEntity<Result> postPaperLike(@RequestBody RequestHeartDto requestLikeDto, @LoginUser String uid) {
        requestLikeDto.setContentCodeId(2);
        LOGGER.info("일기 좋아요 paperId: {}, uid: {}", requestLikeDto.getContentId(), uid);

        notificationService.dtoToSend(paperService.postPaperLike(requestLikeDto, uid));
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @DeleteMapping("/{paper-id}/like")
    public ResponseEntity<Result> deletePaperLike(@PathVariable(value = "paper-id") long paperId, @LoginUser String uid) {
        LOGGER.info("일기 좋아요 삭제 uid: {}" , uid);

        paperService.deletePaperLike(RequestHeartDto.builder()
                        .contentId(paperId)
                        .contentCodeId(2)
                        .build()
                , uid);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

}
