package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum DiaryErrorCode implements ErrorCode {

    DIARY_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 일기장입니다."),
    DIARY_WRONG_USER(HttpStatus.UNAUTHORIZED, "권한이 없는 일기장 수정 요청입니다."),
    DIARY_DUPLICATE_SYMPTOM(HttpStatus.CONFLICT, "증상이 이미 존재합니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
