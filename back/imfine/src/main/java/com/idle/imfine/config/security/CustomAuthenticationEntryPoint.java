package com.idle.imfine.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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

        if(exception.equals(String.valueOf(Code.UNKNOWN_ERROR.getCode()))){
            setResponse(response, Code.UNKNOWN_ERROR);
        }
        // 잘못된 타입의 토큰
        else if(exception.equals(String.valueOf(Code.WRONG_TYPE_TOKEN.getCode()))){
            setResponse(response, Code.WRONG_TYPE_TOKEN);
        }
        // 토큰이 만료된 경우
        else if(exception.equals(String.valueOf(Code.EXPIRED_TOKEN.getCode()))){
            setResponse(response, Code.EXPIRED_TOKEN);
        }else if (exception.equals(String.valueOf(Code.NOT_FOUND_USER.getCode()))){
            setResponse(response, Code.NOT_FOUND_USER);
        } else{
            setResponse(response, Code.ACCESS_DENIED);
        }
    }

    //한글 출력을 위해 getWriter() 사용
    private void setResponse(HttpServletResponse response, Code code) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.getWriter().write(objectMapper.writeValueAsString(
                JsonDto.builder()
                        .success(false)
                        .code(code.getCode())
                        .msg(code.getMessage())
                        .build()
        ));
    }
}