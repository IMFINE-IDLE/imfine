package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SubscribeErrorCode implements ErrorCode {

    SUBSCRIBE_DUPLICATE_DIARY(HttpStatus.CONFLICT, "이미 구독한 일기장입니다."),
    SUBSCRIBE_NOT_FOUND(HttpStatus.NOT_FOUND, "구독하지 않은 일기장입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
