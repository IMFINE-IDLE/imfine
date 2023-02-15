package com.idle.imfine.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ImageErrorCode implements ErrorCode {
    IMAGE_SAVE_CONFLICT(HttpStatus.CONFLICT, "이미지 삭제 처리에 실패했습니다."),
    REQUEST_IMAGE_TOO_LARGE(HttpStatus.BAD_REQUEST, "3개가 초과하는 개수의 이미지를 저장할 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;

}
