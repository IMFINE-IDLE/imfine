package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommentErrorCode implements ErrorCode {

    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다."),
    COMMENT_ACCESS_DENIED(HttpStatus.UNAUTHORIZED, "접근이 거부되었습니다")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
