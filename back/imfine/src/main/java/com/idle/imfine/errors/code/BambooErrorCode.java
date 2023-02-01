package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BambooErrorCode implements ErrorCode {
    BAMBOO_NOT_FOUND(HttpStatus.NOT_FOUND, "24시간이 지난 게시물 입니다.")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
