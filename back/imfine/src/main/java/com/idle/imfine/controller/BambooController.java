package com.idle.imfine.controller;

import com.idle.imfine.data.dto.bamboo.request.RequestBambooDto;
import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.dto.bamboo.response.ResponseBambooDetailDto;
import com.idle.imfine.data.dto.leaf.response.ResponseLeafDto;
import com.idle.imfine.data.dto.like.request.RequestLikeDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bamboo")
@Slf4j
public class BambooController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);

    @GetMapping("/list")
    public ResponseEntity<List<ResponseBamboo>> getList(@RequestParam("filter") String filter){
        LOGGER.info("list api에 들어옴  {}", filter);
        List<ResponseBamboo> rbl = new ArrayList<ResponseBamboo>();
        if (true){
            rbl.add(new ResponseBamboo(1, "안녕하세요.", LocalDateTime.now(), 10, 10));
            rbl.add(new ResponseBamboo(2, "반갑습니다.", LocalDateTime.now(), 11, 11));
            rbl.add(new ResponseBamboo(3, "안녕히 가세요.", LocalDateTime.now(), 12, 12));
            return new ResponseEntity<List<ResponseBamboo>>(rbl, HttpStatus.OK);
        } else {
            return null;
        }
    }


    @GetMapping("/myactive")
    // 로그인 구현되면 loginuser 추가하기
    public ResponseEntity<List<ResponseBamboo>> getMyActiveList(@RequestParam("filter") String filter){
        LOGGER.info("myactivelist api에 들어옴  {}", filter);
        List<ResponseBamboo> rbl = new ArrayList<ResponseBamboo>();
        if (true){
            rbl.add(new ResponseBamboo(1, "안녕하세요.", LocalDateTime.now(), 10, 10));
            rbl.add(new ResponseBamboo(2, "반갑습니다.", LocalDateTime.now(), 11, 11));
            rbl.add(new ResponseBamboo(3, "안녕히 가세요.", LocalDateTime.now(), 12, 12));
            return new ResponseEntity<List<ResponseBamboo>>(rbl, HttpStatus.OK);
        } else {
            return null;
        }
    }

    @GetMapping("/detail/{bamboo-id}")
    // 로그인 구현되면 loginuser 추가하기
    public ResponseEntity<ResponseBambooDetailDto> getBambooDetail(@PathVariable("bamboo-id") int bambooId){
        LOGGER.info("getBamboodetail api에 들어옴  {}", bambooId);
        if (true){
            List<ResponseLeafDto> rl = new ArrayList<>();
            rl.add(new ResponseLeafDto(1, "나는 댓글 1번 입니다.", 10, 10, LocalDateTime.now()));
            rl.add(new ResponseLeafDto(2, "나는 댓글 2번 입니다.", 0, 10, LocalDateTime.now()));
            rl.add(new ResponseLeafDto(3, "나는 댓글 3번 입니다.", 5, 10, LocalDateTime.now()));
            return new ResponseEntity<ResponseBambooDetailDto>(new ResponseBambooDetailDto(1, "저는 대나무 입니다.", LocalDateTime.now(), 10,10, rl), HttpStatus.OK);
        } else {
            return null;
        }

    }
    @PostMapping
    // 로그인 구현되면 loginuser 추가하기
    public ResponseEntity<String> postBamboo(@RequestBody String content) {
        LOGGER.info("대나무 등록 api에 들어왔습니다. {}", content);
        RequestBambooDto rbd = new RequestBambooDto(content, 1);
        LOGGER.info("대나무 등록 api에 들어왔습니다. {}", rbd);

        return new ResponseEntity<String>("대나무 등록 성공", HttpStatus.OK);
    }
    @PostMapping("/like")
    // 로그인 구현되면 loginuser 추가하기
    public ResponseEntity<String> postBambooLike(@RequestBody int bambooId) {
        LOGGER.info("대나무 좋아요 api에 들어왔습니다. {}", bambooId);
        RequestLikeDto rl = new RequestLikeDto(1, 1, bambooId);
        LOGGER.info("대나무 좋아요 {}", rl );
        return new ResponseEntity<String>("대나무 좋아요 등록 성공", HttpStatus.OK);
    }

    @DeleteMapping("/like/{bamboo-id}")
    // 로그인 구현되면 loginuser 추가하기
    // 검증을 서비스에서 해야하나?
    public ResponseEntity<String> deleteBambooLike(@PathVariable("bamboo-id") int bambooId) {
        LOGGER.info("대나무 좋아요 삭제 api에 들어왔습니다. {}", bambooId);
        RequestLikeDto rl = new RequestLikeDto(1, 1, bambooId);
        LOGGER.info("대나무 좋아요 삭제 {}", rl );
        return new ResponseEntity<String>("대나무 좋아요 삭제 성공", HttpStatus.OK);
    }
}
