package com.idle.imfine.controller;

import com.idle.imfine.data.dto.comment.request.RequestContentRegistraitionDto;
import com.idle.imfine.data.dto.comment.response.ResponseCommentDto;
import com.idle.imfine.data.dto.like.request.RequestHeartDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
@Slf4j
public class CommentController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CommentController.class);

    @PostMapping
    public ResponseEntity<String> postComment(@RequestBody RequestContentRegistraitionDto requestContentRegistraitionDto) {
        requestContentRegistraitionDto.setUserId(1);
        LOGGER.info("댓글 생성 {}", requestContentRegistraitionDto);
        return new ResponseEntity<>("댓글 생성 완료", HttpStatus.OK);
    }

    @GetMapping("/{paper-id}")
    public ResponseEntity<List<ResponseCommentDto>> getCommentListDto(@PathVariable(value = "paper-id") long paperId) {
        List<ResponseCommentDto> comments = new ArrayList<>();
        comments.add(new ResponseCommentDto(1, 1, 1, 1, "유제제혁", "힘내세요!", LocalDateTime.now().format(
            DateTimeFormatter.ofPattern("yyyyMMddHHmmss")), 0));
        comments.add(new ResponseCommentDto(2, 2, 2, 2, "유제제혁", "힘내내세요!", LocalDateTime.now().format(
            DateTimeFormatter.ofPattern("yyyyMMddHHmmss")), 1));
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<String> deleteComment(@PathVariable("comment-id") long commentId){
        LOGGER.info("댓글 삭제들어옴 {}", commentId);
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<String> postCommnetLike(@RequestBody RequestHeartDto requestLikeDto) {
        requestLikeDto.setSenderId(1);
        requestLikeDto.setContentCodeId(1);
        LOGGER.info("댓글 등록 들어옴 {}", requestLikeDto);
        return new ResponseEntity<>("좋아요 등록 완료", HttpStatus.OK);
    }

    @DeleteMapping("/like/{comment-id}")
    public ResponseEntity<String> deleteCommentLike(@PathVariable(value = "comment-id") long commentId) {
        RequestHeartDto requestLikeDto = new RequestHeartDto(1, 3, (int)commentId);
        LOGGER.info("좋아요 삭제 {}", requestLikeDto);
        return new ResponseEntity<>("댓글 좋아요 삭제!", HttpStatus.OK);
    }
}
