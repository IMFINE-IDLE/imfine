package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FollowErrorCode implements ErrorCode {

    FOLLOW_ERROR_CODE(HttpStatus.BAD_REQUEST, "일단 에러 처리"),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
