package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;
import com.idle.imfine.service.leaf.LeafService;
import com.idle.imfine.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leaf")
@RequiredArgsConstructor
@Slf4j
public class LeafController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LeafController.class);
    private final LeafService leafService;
    private final NotificationService notificationService;
    private final ResponseService responseService;

    @PostMapping
    public ResponseEntity<Result> postLeaf(@RequestBody RequestLeafDto requestLeaf, @LoginUser String uid) {
        requestLeaf.setWriterId(uid);
        notificationService.dtoToSend(leafService.save(requestLeaf));
        LOGGER.info("잎 등록 api에 들어옴 {}", requestLeaf);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/like")
    public ResponseEntity<Result> postLeafLike(@RequestBody RequestHeartDto requestHeartDto, @LoginUser String uid) {
        LOGGER.info("대나무 잎 좋아요 api 들어옴");
        notificationService.dtoToSend(leafService.likeLeaf(requestHeartDto, uid));
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/like/{leaf-id}")
    public ResponseEntity<Result> deleteLeafLike(@PathVariable("leaf-id") long leafId, @LoginUser String uid) {
        LOGGER.info("잎 좋아요 삭제 api에 들어옴 {}", leafId);
        leafService.deleteLikeLeaf(leafId, uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
}
