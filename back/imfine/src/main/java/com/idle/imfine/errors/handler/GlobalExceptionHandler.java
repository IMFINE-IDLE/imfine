package com.idle.imfine.errors.handler;

import com.idle.imfine.errors.errorcode.CommonErrorCode;
import com.idle.imfine.errors.errorcode.ErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.errors.response.ErrorResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private final ErrorResponseService responseService;
    
    @ExceptionHandler(ErrorException.class)
    public ResponseEntity<Object> handleCustomException(final ErrorException e) {
        final ErrorCode errorCode = e.getErrorCode();
        return responseService.handleExceptionInternal(errorCode);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(final IllegalArgumentException e) {
        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
        return responseService.handleExceptionInternal(errorCode, e.getMessage());
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            final MethodArgumentNotValidException e,
            final HttpHeaders headers,
            final HttpStatus status,
            final WebRequest request) {
        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
        return responseService.handleExceptionInternal(e, errorCode);
    }

}
