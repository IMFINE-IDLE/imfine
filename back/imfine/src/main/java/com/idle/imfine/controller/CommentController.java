package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.comment.request.RequestContentRegistraitionDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RequiredArgsConstructor
@RequestMapping("/comment")
@RestController
public class CommentController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CommentController.class);
    private final CommentService commentService;
    private final ResponseService responseService;
    @PostMapping
    public ResponseEntity<Result> postComment(@RequestBody RequestContentRegistraitionDto requestContentRegistraitionDto, @LoginUser String uid) {
        commentService.save(requestContentRegistraitionDto, uid);
        LOGGER.info("댓글 생성 {}", requestContentRegistraitionDto);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

//    @GetMapping("/{paper-id}")
//    public ResponseEntity<List<ResponseCommentDto>> getCommentListDto(@PathVariable(value = "paper-id") long paperId) {
//        List<ResponseCommentDto> comments = new ArrayList<>();
//        comments.add(new ResponseCommentDto(1, 1, 1, 1, "유제제혁", "힘내세요!", LocalDateTime.now().format(
//            DateTimeFormatter.ofPattern("yyyyMMddHHmmss")), 0));
//        comments.add(new ResponseCommentDto(2, 2, 2, 2, "유제제혁", "힘내내세요!", LocalDateTime.now().format(
//            DateTimeFormatter.ofPattern("yyyyMMddHHmmss")), 1));
//        return new ResponseEntity<>(comments, HttpStatus.OK);
//    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Result> deleteComment(@PathVariable("comment-id") long commentId, @LoginUser String uid){
        commentService.delete(commentId, uid);
        LOGGER.info("댓글 삭제들어옴 {}", commentId);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @PostMapping("/like")
    public ResponseEntity<Result> postCommentLike(@RequestBody RequestHeartDto requestHeartDto, @LoginUser String uid) {
        commentService.postCommentLike(requestHeartDto, uid);
        LOGGER.info("댓글 좋아요 등록 들어옴 {}", requestHeartDto);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }

    @DeleteMapping("/like/{comment-id}")
    public ResponseEntity<Result> deleteCommentLike(@PathVariable(value = "comment-id") RequestHeartDto requestHeartDto, @LoginUser String uid) {
        requestHeartDto.setContentCodeId(3);
        commentService.deleteCommentLike(requestHeartDto, uid);
        LOGGER.info("좋아요 삭제 {}", commentService);
        return ResponseEntity.ok().body(responseService.getSuccessResult());
    }
}
