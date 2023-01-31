package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;
import com.idle.imfine.service.leaf.LeafService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leaf")
@RequiredArgsConstructor
@Slf4j
public class LeafController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);
    private final LeafService leafService;
    private final ResponseService responseService;

    @PostMapping
    // loginuser 필요
    public ResponseEntity<Result> postLeaf(@RequestBody RequestLeafDto requestLeaf, @LoginUser String uid) {
        requestLeaf.setWriterId(uid);
        leafService.save(requestLeaf);
        LOGGER.info("잎 등록 api에 들어옴 {}", requestLeaf);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/like")
    public ResponseEntity<Result> postLeafLike(@RequestBody long leafId, @LoginUser String uid) {
//        RequestHeartDto requestLikeDto = new RequestHeartDto(1, leafId, 2);
        LOGGER.info("잎 좋아요 등록 api에 들어옴 {}", leafId);
        leafService.likeLeaf(leafId, uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/like/{leaf-id}")
    public ResponseEntity<Result> deleteLeafLike(@PathVariable("leaf-id") long leafId, @LoginUser String uid) {
//        RequestHeartDto requestLikeDto = new RequestHeartDto(1, leafId, 2);
        LOGGER.info("잎 좋아요 삭제 api에 들어옴 {}", leafId);
        leafService.deleteLikeLeaf(leafId, uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
}
