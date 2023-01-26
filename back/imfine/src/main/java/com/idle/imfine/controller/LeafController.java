package com.idle.imfine.controller;

import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;
import com.idle.imfine.data.dto.like.request.RequestLikeDto;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/leaf")
@Slf4j
public class LeafController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);

    @PostMapping
    // loginuser 필요
    public ResponseEntity<String> postLeaf(@RequestBody RequestLeafDto requestLeaf) {
        requestLeaf.setWriterId(1);
        LOGGER.info("잎 등록 api에 들어옴 {}", requestLeaf);
        return new ResponseEntity<>("잎 등록 성공", HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<String> postLeafLike(@RequestBody int leafId) {
        RequestLikeDto requestLikeDto = new RequestLikeDto(1, leafId, 2);
        LOGGER.info("잎 좋아요 등록 api에 들어옴 {}", requestLikeDto);
        return new ResponseEntity<String>("대나무 좋아요 등록 성공", HttpStatus.OK);
    }

    @DeleteMapping("/like/{leaf-id}")
    public ResponseEntity<String> deleteLeafLike(@PathVariable("leaf-id") int leafId) {
        RequestLikeDto requestLikeDto = new RequestLikeDto(1, leafId, 2);
        LOGGER.info("잎 좋아요 삭제 api에 들어옴 {}", requestLikeDto);
        return new ResponseEntity<String>("대나무 좋아요 삭제 성공", HttpStatus.OK);
    }
}