package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TokenErrorCode implements ErrorCode {

    UNKNOWN_ERROR(HttpStatus.NOT_FOUND, "알려지지않은 에러입니다."),
    WRONG_TYPE_TOKEN(HttpStatus.BAD_REQUEST, "변조된 토큰입니다."),

    WRONG_TOKEN(HttpStatus.NOT_FOUND, "잘못된 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
    UNSUPPORTED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "토큰이 존재하지 않습니다."),
    ACCESS_DENIED(HttpStatus.UNAUTHORIZED, "접근이 거부되었습니다"),

    REFRESH_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "리프레시 토큰이 존재하지 않습니다."),
    NOT_MATCH_REFRESH_TOKEN(HttpStatus.NOT_FOUND, "리프레시 토큰이 일치하지 않습니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 만료되었습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 유효하지 않습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
