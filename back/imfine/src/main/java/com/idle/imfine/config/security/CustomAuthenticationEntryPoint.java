package com.idle.imfine.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.idle.imfine.errors.code.ErrorCode;
import com.idle.imfine.errors.code.TokenErrorCode;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.response.ErrorResponse;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

// 인증 실패시 결과를 처리해주는 로직을 가지고 있는 클래스
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final Logger LOGGER = LoggerFactory.getLogger(CustomAuthenticationEntryPoint.class);
    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        LOGGER.info("[commence] 인증 실패로 response.sendError 발생");

        String exception = String.valueOf(request.getAttribute("exception"));

        if (exception == null) {
            setResponse(response, TokenErrorCode.UNKNOWN_ERROR);
        }
        else if (exception.equals(UserErrorCode.USER_NOT_FOUND.name())) {
            setResponse(response, UserErrorCode.USER_NOT_FOUND);
        }
        else if (exception.equals(TokenErrorCode.TOKEN_NOT_FOUND.name())) {
            setResponse(response, TokenErrorCode.TOKEN_NOT_FOUND);
        }
        else if (exception.equals(TokenErrorCode.EXPIRED_TOKEN.name())) {
            setResponse(response, TokenErrorCode.EXPIRED_TOKEN);
        }
        else if (exception.equals(TokenErrorCode.UNSUPPORTED_TOKEN.name())) {
            setResponse(response, TokenErrorCode.UNSUPPORTED_TOKEN);
        }
        else if (exception.equals(TokenErrorCode.WRONG_TYPE_TOKEN.name())) {
            setResponse(response, TokenErrorCode.WRONG_TYPE_TOKEN);
        }
        else {
            setResponse(response, TokenErrorCode.ACCESS_DENIED);
        }
    }

    //한글 출력을 위해 getWriter() 사용
    private void setResponse(HttpServletResponse response, ErrorCode errorCode)
            throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.getWriter().write(objectMapper.writeValueAsString(
                ErrorResponse.builder()
                        .success(false)
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.name())
                        .message(errorCode.getMessage())
                        .build()
        ));
    }
}