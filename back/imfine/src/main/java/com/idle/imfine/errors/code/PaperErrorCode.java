package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PaperErrorCode implements ErrorCode {

    PAPER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 일기입니다."),
    PAPER_DUPLICATE_DATE(HttpStatus.CONFLICT, "해당 날짜는 이미 작성했습니다.")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
