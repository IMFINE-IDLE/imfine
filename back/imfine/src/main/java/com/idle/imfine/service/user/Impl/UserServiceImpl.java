package com.idle.imfine.service.user.Impl;

import com.idle.imfine.config.security.JwtTokenProvider;
import com.idle.imfine.data.dto.user.request.*;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.SearchUserInfoResponseDto;
import com.idle.imfine.data.entity.FollowWait;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.UserHasMedical;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.repository.medical.MedicalCodeRepository;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.data.repository.user.FollowWaitRepository;
import com.idle.imfine.data.repository.user.UserHasMedicalRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.MedicalErrorCode;
import com.idle.imfine.errors.code.TokenErrorCode;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.errors.token.TokenNotFoundException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.user.FollowService;
import com.idle.imfine.service.user.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final Common common;
    private final UserRepository userRepository;
    private final UserHasMedicalRepository userHasMedicalRepository;
    private final FollowRepository followRepository;
    private final FollowWaitRepository followWaitRepository;
    private final MedicalCodeRepository medicalCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final FollowService followService;

    @Override
    public HttpHeaders signUp(SignUpRequestDto requestDto) {
        LOGGER.info("[signUp] 회원 가입 정보 전달");

        checkUidDuplicate(requestDto.getUid());
        checkNameDuplicate(requestDto.getName());
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

        LOGGER.info("[signUp] 회원 토큰 생성");
        String accessToken = jwtTokenProvider.createAccessToken(user.getUid(), user.getRoles());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUid(), user.getRoles());
        LOGGER.info("[signUp] 회원 토큰 생성 완료");

        user.updateRefreshToken(refreshToken);
        userRepository.save(user);
        LOGGER.info("[signUp] 회원 가입 완료");

        return common.createTokenHeader(accessToken, refreshToken);
    }

    @Override
    public HttpHeaders signIn(SignInRequestDto requestDto) {
        LOGGER.info("[signIn] 회원 정보 요청");
        User user = common.getUserByUid(requestDto.getUid());

        LOGGER.info("[signIn] 패스워드 비교 수행");
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new ErrorException(UserErrorCode.USER_WRONG_PASSWORD);
        }
        LOGGER.info("[signIn] 패스워드 일치");

        LOGGER.info("[signIn] 회원 토큰 생성");
        String accessToken = jwtTokenProvider.createAccessToken(user.getUid(), user.getRoles());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUid(), user.getRoles());
        LOGGER.info("[signIn] 회원 토큰 생성 완료");

        user.updateRefreshToken(refreshToken);
        userRepository.save(user);
        LOGGER.info("[signIn] refreshToken 저장 완료");

        return common.createTokenHeader(accessToken, refreshToken);
    }

    @Override
    public void initProfile(String uid, InitProfileRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        user.setOpen(requestDto.isOpen());

        // 중복 코드..
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
    public HttpHeaders signOut(String uid) {
        LOGGER.info("[signOut] 로그아웃 시도");
        User user = common.getUserByUid(uid);

        LOGGER.info("[signOut] refresh token 제거 시도");
        user.updateRefreshToken(null);
        LOGGER.info("[signOut] refresh token 제거 완료");

        userRepository.save(user);
        LOGGER.info("[signOut] 로그아웃 성공");

        return common.deleteTokenHeader();
    }

    @Override
    public HttpHeaders refresh(Cookie cookie) throws RuntimeException {
        if (cookie == null) {
            throw new ErrorException(TokenErrorCode.REFRESH_TOKEN_NOT_FOUND);
        }

        String refreshToken = cookie.getValue();

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new ErrorException(TokenErrorCode.REFRESH_TOKEN_NOT_FOUND);
        } else if (!Pattern.matches("Bearer%.*", refreshToken)) {
            throw new ErrorException(TokenErrorCode.WRONG_TYPE_TOKEN);
        }

        try {
            refreshToken = refreshToken.substring(7);
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

            return common.createTokenHeader(newAccessToken, newRefreshToken);
        } catch (TokenNotFoundException e) {
            throw new ErrorException(TokenErrorCode.REFRESH_TOKEN_NOT_FOUND);
        } catch (ExpiredJwtException e){
            throw new ErrorException(TokenErrorCode.EXPIRED_REFRESH_TOKEN);
        } catch (Exception e) {
            throw new ErrorException(TokenErrorCode.INVALID_REFRESH_TOKEN);
        }
    }

    public void checkUidDuplicate(String uid) {
        LOGGER.info("[checkUidDuplicate] 회원 uid 중복 검사 시작");
        if (userRepository.existsByUid(uid)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_UID);
        }
        LOGGER.info("[checkUidDuplicate] 회원 uid 중복 검사 완료");
    }

    public void checkNameDuplicate(String name) {
        LOGGER.info("[checkNameDuplicate] 회원 name 중복 검사 시작");
        if (userRepository.existsByName(name)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_NAME);
        }
        LOGGER.info("[checkNameDuplicate] 회원 name 중복 검사 완료");
    }

    public void checkEmailDuplicate(String email) {
        LOGGER.info("[checkEmailDuplicate] 회원 email 중복 검사 시작");
        if (userRepository.existsByEmail(email)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_EMAIL);
        }
        LOGGER.info("[checkEmailDuplicate] 회원 email 중복 검사 완료");
    }

    @Override
    public void withdrawal(String uid) {
        LOGGER.info("[withdrawal] 회뤈탈퇴 시도");
        User user = common.getUserByUid(uid);
        LOGGER.info("[withdrawal] 회뤈 정보 조회 성공 {}", user.getUid());

        List<User> followingList = followRepository.findAllFollowingUserByFollowedUser(user);
        for (User following : followingList) {
            common.decreaseFollowingCount(following);
        }
        LOGGER.info("[withdrawal] 팔로워들의 팔로잉 수 감소 완료");

        List<User> followedList = followRepository.findAllFollowedUserByFollowingUser(user);
        for (User follower : followedList) {
            common.decreaseFollowerCount(follower);
        }
        LOGGER.info("[withdrawal] 팔로잉들의 팔로워 수 감소 완료");

        userRepository.deleteById(user.getId());
        LOGGER.info("[withdrawal] 회뤈탈퇴 성공");
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
        boolean beforeState = user.isOpen();
        boolean afterState = requestDto.isOpen();
        user.setOpen(afterState);

        if (!beforeState && afterState) {
            LOGGER.info("[modifyUserOpen] 팔로우 요청 수락 시작");
            List<FollowWait> followWaitList = followWaitRepository.findAllByReceiver(user);
            LOGGER.info("[modifyUserOpen] 팔로우 요청 목록 가져오기 완료");
            for (FollowWait followWait : followWaitList) {
                User requester = followWait.getRequester();
                LOGGER.info("[modifyUserOpen] {}의 요청 수락 시작", requester);
                followService.allowUserRequest(uid, requester.getUid());
            }
            LOGGER.info("[modifyUserOpen] 요청 모두 수락 완료");
        }

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
        LOGGER.info("[changePassword] 비밀번호 변경 시작");
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        userRepository.save(user);
        LOGGER.info("[changePassword] 비밀번호 변경 완료");
    }

    @Override
    public FindIdResponseDto findId(String email) {
        LOGGER.info("[findId] 회원 uid 찾기 시작");
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
        LOGGER.info("[findId] user {}", user.getUid());

        return FindIdResponseDto.builder()
                .uid(user.getUid())
                .build();
    }
    @Override
    public void checkIdAndEmail(String uid, String email) {
        LOGGER.info("[checkIdAndEmail] 회원 uid & email 일치 검사 시작");
        userRepository.findByUidAndEmail(uid, email)
                .orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
        LOGGER.info("[checkIdAndEmail] 회원 uid & email 일치 검사 성공");
    }

    @Override
    public void changePassword(String uid, ChangePasswordRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        LOGGER.info("[changePassword] 비밀번호 변경 시작");
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        userRepository.save(user);
        LOGGER.info("[changePassword] 비밀번호 변경 완료");
    }

}
