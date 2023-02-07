package com.idle.imfine.config.security;

import com.idle.imfine.errors.code.TokenErrorCode;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.token.TokenNotFoundException;
import com.idle.imfine.errors.token.UserNotFoundException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 헤더에서 JWT 토큰 가져오기
        String token = jwtTokenProvider.resolveToken(request);
        LOGGER.info("[doFilterInternal] token 값 추출 완료. token : {}", token);

        try {
            LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
            if (jwtTokenProvider.validateToken(token)) {
                // 토큰으로부터 유저 정보 가져오기
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                // SecurityContext에 Authentication 객체 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            LOGGER.info("[doFilterInternal] token 값 유효성 체크 완료");
        } catch (UserNotFoundException e) {
            request.setAttribute("exception", UserErrorCode.USER_NOT_FOUND.name());
        } catch (TokenNotFoundException e) {
            request.setAttribute("exception", TokenErrorCode.TOKEN_NOT_FOUND.name());
        } catch (ExpiredJwtException e){
            request.setAttribute("exception", TokenErrorCode.EXPIRED_TOKEN.name());
        } catch (UnsupportedJwtException e) {
            request.setAttribute("exception", TokenErrorCode.UNSUPPORTED_TOKEN.name());
        } catch (SignatureException | MalformedJwtException e){
            request.setAttribute("exception", TokenErrorCode.WRONG_TYPE_TOKEN.name());
        } catch (Exception e) {
            log.error("================================================");
            log.error("JwtFilter - doFilterInternal() 오류발생");
            log.error("token : {}", token);
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception StackTrace : {");
            e.printStackTrace();
            log.error("}");
            log.error("================================================");
            request.setAttribute("exception", TokenErrorCode.UNKNOWN_ERROR.name());
        }

        LOGGER.info("[doFilterInternal] doFilter ");
        filterChain.doFilter(request, response);
    }
}