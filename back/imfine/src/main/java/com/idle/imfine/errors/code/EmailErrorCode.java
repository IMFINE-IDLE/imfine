package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum EmailErrorCode implements ErrorCode {

    EMAIL_FAILED(HttpStatus.BAD_REQUEST, "이메일 전송에 실패했습니다."),
    EMAIL_AUTH_INVALID(HttpStatus.BAD_REQUEST, "이메일 인증번호가 유효하지않습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
