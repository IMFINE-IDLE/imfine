package com.idle.imfine.service.user.Impl;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.ChangePasswordRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserNameRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserOepnRequestDto;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.GetUserInfoResponseDto;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(SignServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private User getUserByUid(String uid) {
        return userRepository.findByUid(uid).orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
    }

    @Override
    public void withdrawal(String uid) {
        LOGGER.info("[UserService.withdrawal] 회뤈탈퇴 시도");

        User user = getUserByUid(uid);
        LOGGER.info("[UserService.withdrawal] 회뤈 정보 조회 성공 {}", user.getUid());

        userRepository.deleteById(user.getId());
        LOGGER.info("[UserService.withdrawal] 회뤈탈퇴 성공");
    }
    @Override
    public GetUserInfoResponseDto searchUserInfo(String uid) {
        User user = getUserByUid(uid);

        return GetUserInfoResponseDto.builder()
                .name(user.getName())
                .open(user.isOpen())
                .followingCount(user.getFollowingCount())
                .followerCount(user.getFollowerCount())
                // 관심 질병 추기!!
                .build();
    }

    @Override
    public void modifyUserName(String uid, ModifyUserNameRequestDto requestDto) {
        User user = getUserByUid(uid);
        String newName = requestDto.getName();

        if (!user.getName().equals(newName) && userRepository.existsByName(newName)) {
            throw new ErrorException(UserErrorCode.USER_DUPLICATE_NAME);
        }

        user.setName(requestDto.getName());
        userRepository.save(user);
    }

    @Override
    public void modifyUserOpen(String uid, ModifyUserOepnRequestDto requestDto) {
        User user = getUserByUid(uid);
        user.setOpen(requestDto.isOpen());
        userRepository.save(user);
    }

//    @Override
//    public CommonResponseMessage modifyUserMedicalList(String uid, ModifyUserMedicalListRequestDto requestDto) {
//        User user = userRepository.getByUid(uid);
//
//        user.setMedicalList(requestDto.getMedicalList());
//
//        userRepository.save(user);
//
//        CommonResponseMessage responseDto = CommonResponseMessage.builder()
//                .success(true)
//                .status(200)
//                .message("회원 닉네임 변경을 성공했습니다.")
//                .build();
//
//        return responseDto;
//    }

    @Override
    public void changePassword(ChangePasswordRequestDto requestDto) {
        User user = userRepository.getByUid(requestDto.getUid());

        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        userRepository.save(user);

        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("비밀번호 변경에 성공했습니다.")
                .build();

    }

    @Override
    public FindIdResponseDto findId(String email) {
        User user = userRepository.getByEmail(email);

        LOGGER.info("[findId] user {}", user.getUid());

        FindIdResponseDto responseDto = FindIdResponseDto.builder()
                .uid(user.getUid())
                .build();

        return responseDto;
    }
    @Override
    public void checkIdAndEmail(String uid, String email) {
        User user = userRepository.getByUid(uid);

        CommonResponseMessage responseDto;

        if (user.getEmail().equals(email)) {
            responseDto = CommonResponseMessage.builder()
                    .success(true)
                    .status(200)
                    .message("아이디와 이메일이 일치합니다.")
                    .build();
        } else {
            responseDto = CommonResponseMessage.builder()
                    .success(false)
                    .status(-1)
                    .message("아이디와 이메일이 일치하지 않습니다.")
                    .build();
        }

    }

    @Override
    public void changePassword(String uid, ChangePasswordRequestDto requestDto) {
        User user = userRepository.getByUid(uid);

        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        userRepository.save(user);

        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("비밀번호 변경에 성공했습니다.")
                .build();
    }



}
