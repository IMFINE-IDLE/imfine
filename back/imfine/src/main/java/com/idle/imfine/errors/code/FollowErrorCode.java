package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FollowErrorCode implements ErrorCode {

    FOLLOW_ERROR_CODE(HttpStatus.BAD_REQUEST, "일단 에러 처리"),
    CANNOT_FOLLOW_ME(HttpStatus.BAD_REQUEST, "나를 팔로우할 수 없습니다."),
    ALREADY_FOLLOWING(HttpStatus.BAD_REQUEST, "이미 팔로우 상태입니다."),
    NOT_ALREADY_FOLLOWING(HttpStatus.BAD_REQUEST, "이미 팔로우 중이 아닙니다."),
    FOLLOWED_PRIVATE_USER(HttpStatus.BAD_REQUEST, "비공개 사용자를 팔로우했습니다.")
    ;
ㄴ
    private final HttpStatus httpStatus;
    private final String message;

}
