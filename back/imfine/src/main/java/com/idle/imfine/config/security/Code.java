package com.idle.imfine.config.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Code {

    NOT_FOUND_USER(-102, "존재하지 않은 회원입니다."),
    UNKNOWN_ERROR(-1000, "토큰이 존재하지 않습니다."),
    WRONG_TYPE_TOKEN(-1001, "변조된 토큰입니다."),
    EXPIRED_TOKEN(-1002, "만료된 토큰입니다."),
    ACCESS_DENIED(-1003, "권한이 없습니다.");

    private int code;
    private String message;

}
