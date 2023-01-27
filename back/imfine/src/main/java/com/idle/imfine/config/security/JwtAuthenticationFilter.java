package com.idle.imfine.config.security;

import com.idle.imfine.data.entity.User;
import com.idle.imfine.exception.token.TokenNotFoundException;
import com.idle.imfine.exception.user.UserNotFoundException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest servletRequest, HttpServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException {


        try{
            // 헤더에서 JWT 토큰 가져오기
            String token = jwtTokenProvider.resolveToken(servletRequest);
            LOGGER.info("[doFilterInternal] token 값 추출 완료. token : {}", token);

            LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
            if (token != null && jwtTokenProvider.validateToken(token)) {
                // 토크으로부터 유저 정보 가져오기
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                // SecurityContext에 Authentication 객체 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
                LOGGER.info("[doFilterInternal] token 값 유효성 체크 완료");
            }
        }catch (UserNotFoundException e){
            LOGGER.info("[doFilterInternal] UserNotFoundException ");
            servletRequest.setAttribute("exception", Code.NOT_FOUND_USER.getCode());
        } catch (TokenNotFoundException e){
            LOGGER.info("[doFilterInternal] TokenNotFoundException ");
            servletRequest.setAttribute("exception", Code.UNKNOWN_ERROR.getCode());
        } catch (ExpiredJwtException e){
            LOGGER.info("[doFilterInternal] ExpiredJwtException ");
            servletRequest.setAttribute("exception", Code.EXPIRED_TOKEN.getCode());
        } catch (SignatureException | MalformedJwtException e){
            LOGGER.info("[doFilterInternal] SignatureException | MalformedJwtException ");
            servletRequest.setAttribute("exception", Code.WRONG_TYPE_TOKEN.getCode());
        }

        LOGGER.info("[doFilterInternal] doFilter ");

        filterChain.doFilter(servletRequest, servletResponse);
    }
}