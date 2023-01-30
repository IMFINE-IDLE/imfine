package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;
import com.idle.imfine.service.leaf.LeafService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leaf")
@Slf4j
public class LeafController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);
    private final LeafService leafService;

    @Autowired
    public LeafController(LeafService leafService) {
        this.leafService = leafService;
    }

    @PostMapping
    // loginuser 필요
    public ResponseEntity<String> postLeaf(@RequestBody RequestLeafDto requestLeaf, @LoginUser String uid) {
        requestLeaf.setWriterId(uid);
        leafService.save(requestLeaf);
        LOGGER.info("잎 등록 api에 들어옴 {}", requestLeaf);
        return new ResponseEntity<>("잎 등록 성공", HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<String> postLeafLike(@RequestBody int leafId, @LoginUser String uid) {
//        RequestHeartDto requestLikeDto = new RequestHeartDto(1, leafId, 2);
        LOGGER.info("잎 좋아요 등록 api에 들어옴 {}", leafId);
        leafService.likeLeaf(leafId, uid);
        return new ResponseEntity<String>("대나무 좋아요 등록 성공", HttpStatus.OK);
    }

    @DeleteMapping("/like/{leaf-id}")
    public ResponseEntity<String> deleteLeafLike(@PathVariable("leaf-id") int leafId, @LoginUser String uid) {
//        RequestHeartDto requestLikeDto = new RequestHeartDto(1, leafId, 2);
        LOGGER.info("잎 좋아요 삭제 api에 들어옴 {}", leafId);
        leafService.deleteLikeLeaf(leafId, uid);
        return new ResponseEntity<String>("대나무 좋아요 삭제 성공", HttpStatus.OK);
    }
}
