package com.idle.imfine.errors.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorCode implements ErrorCode {

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    USER_DUPLICATE_UID(HttpStatus.CONFLICT, "중복된 아이디가 존재합니다."),
    USER_DUPLICATE_NAME(HttpStatus.CONFLICT, "중복된 닉네임이 존재합니다."),
    USER_DUPLICATE_EMAIL(HttpStatus.CONFLICT, "중복된 이메일이 존재합니다."),
    USER_WRONG_UID(HttpStatus.UNAUTHORIZED, "아이디가 틀렸습니다."),
    USER_WRONG_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 틀렸습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
