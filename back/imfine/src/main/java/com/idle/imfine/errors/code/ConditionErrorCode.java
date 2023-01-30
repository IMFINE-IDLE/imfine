package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ConditionErrorCode implements ErrorCode {

    CONDITION_ALREADY_EXIST(HttpStatus.BAD_REQUEST, "컨디션이 이미 존재합니다."),
    CONDITION_NOT_FOUND(HttpStatus.NOT_FOUND, "컨디션이 존재하지 않습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
