package com.idle.imfine.errors.exception;

import com.idle.imfine.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ErrorException extends RuntimeException {

    private final ErrorCode errorCode;

}
