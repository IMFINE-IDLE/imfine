package com.idle.imfine.service.user.Impl;

import com.idle.imfine.config.security.JwtTokenProvider;
import com.idle.imfine.data.dto.user.request.SignInRequestDto;
import com.idle.imfine.data.dto.user.request.SignUpRequestDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.TokenErrorCode;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.errors.token.TokenNotFoundException;
import com.idle.imfine.service.user.SignService;
import com.idle.imfine.service.user.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class SignServiceImpl implements SignService {

    private final Logger LOGGER = LoggerFactory.getLogger(SignServiceImpl.class);

    private final UserService userService;
    private final  UserRepository userRepository;
    private final  JwtTokenProvider jwtTokenProvider;
    private final  PasswordEncoder passwordEncoder;

    @Override
    public SignInResponseDto signUp(SignUpRequestDto requestDto) {
        LOGGER.info("[SignService.signUp] 회원 가입 정보 전달");

        LOGGER.info("[SignService.signUp] 회원 uid 중복 검사");
        userService.checkUidDuplicate(requestDto.getUid());
        LOGGER.info("[SignService.signUp] 회원 name 중복 검사");
        userService.checkNameDuplicate(requestDto.getName());
        LOGGER.info("[SignService.signUp] 회원 email 중복 검사");
        userService.checkEmailDuplicate(requestDto.getEmail());

        // 회원가입 정보
        User user = User.builder()
                .uid(requestDto.getUid())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .open(requestDto.isOpen())
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        User savedUser = userRepository.save(user);

        // 로그인
        SignInResponseDto responseDto = SignInResponseDto.builder()
                .accessToken(jwtTokenProvider.createAccessToken(String.valueOf(user.getUid()), user.getRoles()))
                .refreshToken(jwtTokenProvider.createRefreshToken(String.valueOf(user.getUid()), user.getRoles()))
                .build();

        savedUser.updateRefreshToken(responseDto.getRefreshToken());
        userRepository.save(savedUser);

        return responseDto;
    }

    @Override
    public SignInResponseDto signIn(SignInRequestDto requestDto) throws RuntimeException {
        LOGGER.info("[SignService.signIn] 회원 정보 요청");
        User user = userService.getUserByUid(requestDto.getId());

        LOGGER.info("[SignService.signIn] 패스워드 비교 수행");
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new ErrorException(UserErrorCode.USER_WRONG_PASSWORD);
        }
        LOGGER.info("[SignService.signIn] 패스워드 일치");

        LOGGER.info("[SignService.signIn] ResponseDto 객체 생성");
        SignInResponseDto responseDto = SignInResponseDto.builder()
                .accessToken(jwtTokenProvider.createAccessToken(String.valueOf(user.getUid()), user.getRoles()))
                .refreshToken(jwtTokenProvider.createRefreshToken(String.valueOf(user.getUid()), user.getRoles()))
                .build();

        user.updateRefreshToken(responseDto.getRefreshToken());
        userRepository.save(user);

        return responseDto;
    }

    @Override
    public void signOut(String uid) {
        LOGGER.info("[SignService.signOut] refresh token 제거 uid: {}", uid);
        User user = userService.getUserByUid(uid);
        LOGGER.info("[SignService.signOut] 유저 정보 가져오기 {}", user.getUid());

        user.updateRefreshToken(null);
        LOGGER.info("[SignService.signOut] refresh token 제거");

        userRepository.save(user);
    }

    @Override
    public RefreshResponseDto refresh(String refreshToken) throws RuntimeException {
        try {
            jwtTokenProvider.validateToken(refreshToken);

            String uid = jwtTokenProvider.getUsername(refreshToken);
            User user = userService.getUserByUid(uid);

            String savedRefreshToken = user.getRefreshToken();

            if (!savedRefreshToken.equals(refreshToken)) {
                throw new ErrorException(TokenErrorCode.NOT_MATCH_REFRESH_TOKEN);
            }

            String newAccessToken = jwtTokenProvider.createAccessToken(
                    String.valueOf(user.getUid()), user.getRoles());
            String newRefreshToken = jwtTokenProvider.createRefreshToken(
                    String.valueOf(user.getUid()), user.getRoles());

            user.updateRefreshToken(newRefreshToken);
            userRepository.save(user);

            return RefreshResponseDto.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(newRefreshToken)
                    .build();
        } catch (TokenNotFoundException e) {
            throw new ErrorException(TokenErrorCode.REFRESH_TOKEN_NOT_FOUND);
        } catch (ExpiredJwtException e){
            throw new ErrorException(TokenErrorCode.EXPIRED_REFRESH_TOKEN);
        } catch (Exception e) {
            throw new ErrorException(TokenErrorCode.INVALID_REFRESH_TOKEN);
        }
    }

}