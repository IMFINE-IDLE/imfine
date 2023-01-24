package com.idle.imfine.controller;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.ChangePasswordRequestDto;
import com.idle.imfine.data.dto.user.request.CheckIdAndEmailRequestDto;
import com.idle.imfine.data.dto.user.request.ConditionRequestDto;
import com.idle.imfine.data.dto.user.request.SignInRequestDto;
import com.idle.imfine.data.dto.user.request.SignUpRequestDto;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.FollowListResponseDto;
import com.idle.imfine.data.dto.user.response.GetUserInfoResponseDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SearchConditionResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);

    // Dummy
    private static final String ACCESS_TOKEN =
            "eyJhbGciOiJIUzI1NiJ9"
            + ".eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjc0NTE3ODExLCJleHAiOjE2NzQ1MTk2MTF9"
            + ".AKqswXsa0S2JsJDBmiuC6dtwuwlEVSICsi899lFd2Yo";
    private static final String REFRESH_TOKEN =
            "eyJhbGciOiJIUzI1NiJ9"
            + ".eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjc0NTE3ODEyLCJleHAiOjE2NzUxMjI2MTJ9"
            + ".3_xxYrLsuI1PCTMHSA-73iyFdWuFFhbR2VgB3Kw3qwI";

    private static final String UID = "admin";
    private static final String[] medicalList = {"라식", "라섹"};

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDto requestDto) {
        SignInResponseDto responseDto = SignInResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 로그인되었습니다.")
                .accessToken(ACCESS_TOKEN)
                .refreshToken(REFRESH_TOKEN)
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(String uid) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 로그아웃되었습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        RefreshResponseDto responseDto = RefreshResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 토큰을 갱신했습니다.")
                .accessToken(ACCESS_TOKEN)
                .refreshToken(REFRESH_TOKEN)
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 회원가입되었습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @DeleteMapping
    public ResponseEntity<?> withdrawal(String uid) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 회원탈퇴되었습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping
    public ResponseEntity<?> searchUserInfo(String uid) {
        GetUserInfoResponseDto responseDto = GetUserInfoResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 회원정보를 조회했습니다.")
                .name("건배하는라이언")
                .open(false)
                .followingCount(231)
                .followerCount(299)
                .medicalList(Arrays.asList(medicalList))
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> searchUserInfo(String uid, @PathVariable String id) {
        GetUserInfoResponseDto responseDto = GetUserInfoResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 회원정보를 조회했습니다.")
                .name("졸린무지")
                .open(false)
                .followingCount(311)
                .followerCount(327)
                .medicalList(Arrays.asList(medicalList))
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping
    public ResponseEntity<?> modifyUserInfo(String uid) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 회원정보를 변경했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(String uid, @RequestBody String password) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 비밀번호를 변경했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody String email) {
        FindIdResponseDto responseDto = FindIdResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 아이디를 찾았습니다.")
                .uid(UID)
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/find-password")
    public ResponseEntity<?> checkIdAndEmail(@RequestBody CheckIdAndEmailRequestDto requestDto) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("아이디와 이메일가 일치합니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping("/find-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequestDto requestDto) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 비밀번호가 변경되었습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping("/condition/{id}/{date}")
    public ResponseEntity<?> searchCondition(@PathVariable String id, @PathVariable String date) {
        SearchConditionResponseDto responseDto = SearchConditionResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 컨디션을 조회했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/condition")
    public ResponseEntity<?> createCondition(@RequestBody ConditionRequestDto requestDto) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 컨디션을 등록했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping("/condition")
    public ResponseEntity<?> modifyCondition(@RequestBody ConditionRequestDto requestDto) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 컨디션을 수정했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @DeleteMapping("/condition/{date}")
    public ResponseEntity<?> removeCondition(@PathVariable String date) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 컨디션을 삭제했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping("/{uid}/following")
    public ResponseEntity<?> searchFollowingList(@PathVariable String uid) {
        FollowListResponseDto responseDto = FollowListResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 팔로잉 목록을 조회했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping("/{uid}/follower")
    public ResponseEntity<?> searchFollowerList(@PathVariable String uid) {
        FollowListResponseDto responseDto = FollowListResponseDto.builder()
                .success(true)
                .status(200)
                .message("성공적으로 팔로워 목록을 조회했습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/follow")
    public ResponseEntity<?> followUser(@RequestBody String otherUid) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 팔로우를 맺었습니다.")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @DeleteMapping("/follow/{otherUid}")
    public ResponseEntity<?> unfollowUser(@PathVariable String otherUid) {
        CommonResponseMessage responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 팔로우를 끊었습니다..")
                .build();

        return ResponseEntity.ok()
                .body(responseDto);
    }

















}
