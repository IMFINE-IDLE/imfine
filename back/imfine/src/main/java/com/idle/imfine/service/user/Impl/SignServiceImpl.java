package com.idle.imfine.service.user.Impl;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.config.security.JwtTokenProvider;
import com.idle.imfine.data.dto.user.request.SignInRequestDto;
import com.idle.imfine.data.dto.user.request.SignUpRequestDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.errorcode.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.user.SignService;
import java.util.Collections;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class SignServiceImpl implements SignService {

    private final Logger LOGGER = LoggerFactory.getLogger(SignServiceImpl.class);

    private final  UserRepository userRepository;
    private final  JwtTokenProvider jwtTokenProvider;
    private final  PasswordEncoder passwordEncoder;

    public boolean checkUidDuplication(String uid) {
        return userRepository.existsByUid(uid);
    }
    public boolean checkNameDuplication(String name) {
        return userRepository.existsByName(name);
    }
    public boolean checkEmailDuplication(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void signUp(SignUpRequestDto requestDto) {
        LOGGER.info("[SignService.signUp] 회원 가입 정보 전달");

        if (checkEmailDuplication(requestDto.getEmail())) {
//            throw new UserInfoDuplicationException("이미 회원가입된 이메일 입니다.");
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_EMAIL);
        }

        User user = User.builder()
                .uid(requestDto.getUid())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .open(requestDto.isOpen())
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        User savedUser = userRepository.save(user);
        CommonResponseMessage responseDto;

        LOGGER.info("[SignService.signUp] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if (!savedUser.getName().isEmpty()) {
            responseDto = CommonResponseMessage.builder()
                    .success(true)
                    .status(200)
                    .message("회원가입에 성공했습니다.")
                    .build();
            LOGGER.info("[SignService.signUp] 정상 처리 완료");
        } else {
            responseDto = CommonResponseMessage.builder()
                    .success(false)
                    .status(-1)
                    .message("회원가입에 실패했습니다.")
                    .build();
            LOGGER.info("[SignService.signUp] 실패 처리 완료");
        }
    }

    @Override
    public SignInResponseDto signIn(SignInRequestDto requestDto) throws RuntimeException {
        LOGGER.info("[SignService.signIn] 회원 정보 요청");
        User user = userRepository.getByUid(requestDto.getId());

        LOGGER.info("[SignService.signIn] 패스워드 비교 수행");
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new RuntimeException();
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
        User user = userRepository.getByUid(uid);
        LOGGER.info("[SignService.signOut] 유저 정보 가져오기 {}", user.getUid());

        user.updateRefreshToken(null);
        LOGGER.info("[SignService.signOut] refresh token 제거");

        userRepository.save(user);

        LOGGER.info("[SignService.signOut] ResponseMessage 생성");
        CommonResponseMessage signOutResultDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("로그아웃에 성공했습니다.")
                .build();

    }

    @Override
    public RefreshResponseDto refresh(HttpServletRequest request) throws RuntimeException {
        LOGGER.info("[SignService.refresh] token 값 추출 시작");
        String requestToken = jwtTokenProvider.resolveToken(request);
        LOGGER.info("[SignService.refresh] token 값 추출 완료");

        LOGGER.info("[SignService.refresh] token 값 유효성 체크 시작");
        if (requestToken == null || !jwtTokenProvider.validateToken(requestToken)) {
            LOGGER.info("[SignService.refresh] token 값 유효성 체크 실패");
            throw new RuntimeException();
        }
        LOGGER.info("[SignService.refresh] 요청으로 받은 token 값 유효성 체크 완료");

        String uid = jwtTokenProvider.getUsername(requestToken);
        User user = userRepository.getByUid(uid);
        LOGGER.info("[SignService.refresh] 요청으로 받은 token에서 사용자 정보 추출 완료");

        if (user == null) {
            throw new RuntimeException();
        }

        String refreshToken = user.getRefreshToken();

        LOGGER.info("[SignService.refresh] DB 저장된 token 값 유효성 체크 시작");
        if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
            LOGGER.info("[SignService.refresh] DB 저장된 token 값 유효성 체크 실패");
            user.updateRefreshToken(null);
            userRepository.save(user);
            throw new RuntimeException();
        }
        LOGGER.info("[SignService.refresh] DB에 저장된 token 값 유효성 체크 완료");

        LOGGER.info("[SignService.refresh] 요청으로 받은 토큰과 DB에 저장된 토큰 값 일치 여부 체크 시작");
        if (!requestToken.equals(user.getRefreshToken())) {
            LOGGER.info("[SignService.refresh] 요청으로 받은 토큰과 DB에 저장된 토큰 값 불일치");
            throw new RuntimeException();
        }
        LOGGER.info("[SignService.refresh] 요청으로 받은 토큰과 DB에 저장된 토큰 값 일치");

        String newAccessToken = jwtTokenProvider.createAccessToken(String.valueOf(user.getUid()), user.getRoles());
        String newRefreshToken = jwtTokenProvider.createRefreshToken(String.valueOf(user.getUid()), user.getRoles());

        user.updateRefreshToken(newRefreshToken);
        userRepository.save(user);

        LOGGER.info("[SignService.refresh] ResponseDto 객체 생성");
        RefreshResponseDto responseDto = RefreshResponseDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();

        return responseDto;
    }

}