package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MedicalErrorCode implements ErrorCode {

    MEDICAL_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 질병코드입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
