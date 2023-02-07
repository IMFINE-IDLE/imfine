package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum DeclarationErrorCode implements ErrorCode {

    REPORT_CONFLICT(HttpStatus.CONFLICT, "중복된 신고가 존재합니다."),
    REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, "이미 삭제된 콘텐츠입니다.")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
