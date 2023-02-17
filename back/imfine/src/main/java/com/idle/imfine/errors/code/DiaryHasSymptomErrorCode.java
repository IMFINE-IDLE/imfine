package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum DiaryHasSymptomErrorCode implements ErrorCode {
    SYMPTOM_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 일기장 증상 입니다.")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
