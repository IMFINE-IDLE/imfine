package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum HeartErrorCode implements ErrorCode {
    HEART_NOT_FOUND(HttpStatus.CONFLICT, "좋아요가 이미 존재합니다."),
    HEART_DELETE_CONFLICT(HttpStatus.NOT_FOUND, "좋아요가 존재하지 않습니다.")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
