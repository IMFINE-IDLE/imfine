package com.idle.imfine.errors.response;

import com.idle.imfine.errors.code.ErrorCode;
import com.idle.imfine.errors.response.ErrorResponse.ValidationError;
import java.util.List;
import java.util.stream.Collectors;

import com.idle.imfine.service.user.Impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;

@Service
@Transactional(readOnly = true)
public class ErrorResponseService {

    private final Logger LOGGER = LoggerFactory.getLogger(ErrorResponseService.class);

    private ErrorResponse makeErrorResponse(final ErrorCode errorCode) {
        return ErrorResponse.builder()
                .success(false)
                .error(errorCode.name())
                .message(errorCode.getMessage())
                .build();
    }

    private ErrorResponse makeErrorResponse(final ErrorCode errorCode, final String message) {
        return ErrorResponse.builder()
                .success(false)
                .error(errorCode.name())
                .message(message)
                .build();
    }

    private ErrorResponse makeErrorResponse(final BindException e, final ErrorCode errorCode) {
        final List<ValidationError> validationErrorList = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(ErrorResponse.ValidationError::of)
                .collect(Collectors.toList());

        return ErrorResponse.builder()
                .success(false)
                .error(errorCode.name())
                .message(errorCode.getMessage())
                .errors(validationErrorList)
                .build();
    }

    public ResponseEntity<Object> handleExceptionInternal(final ErrorCode errorCode) {
        LOGGER.warn("[ErrorResponse] {}: {} 에러 발생", errorCode.getHttpStatus(), errorCode.name());
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(makeErrorResponse(errorCode));
    }

    public ResponseEntity<Object> handleExceptionInternal(final ErrorCode errorCode, final String message) {
        LOGGER.warn("[ErrorResponse] {}: {} 에러 발생", errorCode.getHttpStatus(), errorCode.name());
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(makeErrorResponse(errorCode, message));
    }

    public ResponseEntity<Object> handleExceptionInternal(final BindException e, final ErrorCode errorCode) {
        LOGGER.warn("[ErrorResponse] {}: {} 에러 발생", errorCode.getHttpStatus(), errorCode.name());
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(makeErrorResponse(e, errorCode));
    }

}
