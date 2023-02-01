package com.idle.imfine.service.user.Impl;

import com.idle.imfine.config.security.JwtTokenProvider;
import com.idle.imfine.data.dto.user.request.*;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SearchUserInfoResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.UserHasMedical;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.repository.medical.MedicalCodeRepository;
import com.idle.imfine.data.repository.user.UserHasMedicalRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.MedicalErrorCode;
import com.idle.imfine.errors.code.TokenErrorCode;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.errors.token.TokenNotFoundException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.user.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final Common common;
    private final UserRepository userRepository;
    private final UserHasMedicalRepository userHasMedicalRepository;
    private final MedicalCodeRepository medicalCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public SignInResponseDto signUp(SignUpRequestDto requestDto) {
        LOGGER.info("[SignService.signUp] 회원 가입 정보 전달");

        LOGGER.info("[SignService.signUp] 회원 uid 중복 검사");
        checkUidDuplicate(requestDto.getUid());
        LOGGER.info("[SignService.signUp] 회원 name 중복 검사");
        checkNameDuplicate(requestDto.getName());
        LOGGER.info("[SignService.signUp] 회원 email 중복 검사");
        checkEmailDuplicate(requestDto.getEmail());

        // 회원가입 정보
        User user = User.builder()
                .uid(requestDto.getUid())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .open(true)
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
    public SignInResponseDto signIn(SignInRequestDto requestDto) {
        LOGGER.info("[SignService.signIn] 회원 정보 요청");
        User user = common.getUserByUid(requestDto.getUid());

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
        User user = common.getUserByUid(uid);
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
            User user = common.getUserByUid(uid);

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

    public void checkUidDuplicate(String uid) {
        if (userRepository.existsByUid(uid)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_UID);
        }
    }

    public void checkNameDuplicate(String name) {
        if (userRepository.existsByName(name)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_NAME);
        }
    }

    public void checkEmailDuplicate(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_EMAIL);
        }
    }

    @Override
    public void withdrawal(String uid) {
        LOGGER.info("[UserService.withdrawal] 회뤈탈퇴 시도");
        User user = common.getUserByUid(uid);

        LOGGER.info("[UserService.withdrawal] 회뤈 정보 조회 성공 {}", user.getUid());

        userRepository.deleteById(user.getId());
        LOGGER.info("[UserService.withdrawal] 회뤈탈퇴 성공");
    }

    @Override
    public SearchUserInfoResponseDto searchUserInfo(String uid) {
        User user = common.getUserByUid(uid);
        int condition = common.getTodayUserCondition(user);
        List<UserHasMedical> medicalCodeList = userHasMedicalRepository.findAllByUser(user);
        List<String> medicalList = new ArrayList<>();

        for (UserHasMedical userHasMedical : medicalCodeList) {
            medicalList.add(userHasMedical.getMedicalCode().getName());
        }

        return SearchUserInfoResponseDto.builder()
                .name(user.getName())
                .open(user.isOpen())
                .followingCount(user.getFollowingCount())
                .followerCount(user.getFollowerCount())
                .medicalList(medicalList)
                .condition(condition)
                .relation(0)
                .build();
    }

    @Override
    public SearchUserInfoResponseDto searchUserInfo(String uid, String otherUid) {
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);

        int condition = common.getTodayUserCondition(other);
        int relation = common.getFollowRelation(user, other);

        List<UserHasMedical> medicalCodeList = userHasMedicalRepository.findAllByUser(other);
        List<String> medicalList = new ArrayList<>();

        for (UserHasMedical userHasMedical : medicalCodeList) {
            medicalList.add(userHasMedical.getMedicalCode().getName());
        }

        return SearchUserInfoResponseDto.builder()
                .name(other.getName())
                .open(other.isOpen())
                .followingCount(other.getFollowingCount())
                .followerCount(other.getFollowerCount())
                .medicalList(medicalList)
                .condition(condition)
                .relation(relation)
                .build();
    }

    @Override
    public void modifyUserName(String uid, ModifyUserNameRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        String newName = requestDto.getName();

        if (!user.getName().equals(newName) && userRepository.existsByName(newName)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_NAME);
        }

        user.setName(requestDto.getName());
        userRepository.save(user);
    }

    @Override
    public void modifyUserOpen(String uid, ModifyUserOepnRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        user.setOpen(requestDto.isOpen());
        userRepository.save(user);
    }

    @Override
    public void modifyUserMedicalList(String uid, ModifyUserMedicalListRequestDto requestDto) {
        User user = common.getUserByUid(uid);

        LOGGER.info("일단 전부 삭제....");
        userHasMedicalRepository.deleteAllByUser(user);

        for (Integer code : requestDto.getMedicalList()) {
            MedicalCode medicalCode = medicalCodeRepository.findById(code)
                    .orElseThrow(() -> new ErrorException(MedicalErrorCode.MEDICAL_NOT_FOUND));
            // 에러처리 생각해보기...
            UserHasMedical userHasMedical = UserHasMedical.builder()
                    .user(user)
                    .medicalCode(medicalCode)
                    .build();
            userHasMedicalRepository.save(userHasMedical);
        }
    }

    @Override
    public void changePassword(ChangePasswordRequestDto requestDto) {
        User user = common.getUserByUid(requestDto.getUid());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        userRepository.save(user);
    }

    @Override
    public FindIdResponseDto findId(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
        LOGGER.info("[findId] user {}", user.getUid());

        return FindIdResponseDto.builder()
                .uid(user.getUid())
                .build();
    }
    @Override
    public void checkIdAndEmail(String uid, String email) {
        userRepository.findByUidAndEmail(uid, email)
                .orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
    }

    @Override
    public void changePassword(String uid, ChangePasswordRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        userRepository.save(user);
    }

}
