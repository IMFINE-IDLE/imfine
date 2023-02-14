package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ImageErrorCode implements ErrorCode {
    IMAGE_SAVE_CONFLICT(HttpStatus.CONFLICT, "이미지 삭제 처리에 실패했습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
