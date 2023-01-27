package com.idle.imfine.controller;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.common.LoginUser;
import com.idle.imfine.data.dto.user.request.*;
import com.idle.imfine.data.dto.user.response.*;
import com.idle.imfine.service.user.FollowService;
import com.idle.imfine.service.user.SignService;
import com.idle.imfine.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);

    @Autowired
    private SignService signService;

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

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
        SignInResponseDto responseDto = signService.signIn(requestDto);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(String uid) {
        CommonResponseMessage responseDto = signService.signOut(uid);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        RefreshResponseDto responseDto = signService.refresh(request);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto) {
        CommonResponseMessage responseDto = signService.signUp(requestDto);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @DeleteMapping
    public ResponseEntity<?> withdrawal(@LoginUser String uid) {
        CommonResponseMessage responseDto = userService.withdrawal(uid);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping
    public ResponseEntity<?> searchUserInfo(@LoginUser String uid) {
        GetUserInfoResponseDto responseDto = userService.searchUserInfo(uid);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> searchOtherUserInfo(@PathVariable String uid) {
        GetUserInfoResponseDto responseDto = userService.searchUserInfo(uid);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping("/name")
    public ResponseEntity<?> modifyUserName(@LoginUser String uid, @RequestBody ModifyUserNameRequestDto requestDto) {
        CommonResponseMessage responseDto = userService.modifyUserName(uid, requestDto);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping("/open")
    public ResponseEntity<?> modifyUserOpen(@LoginUser String uid, @RequestBody ModifyUserOepnRequestDto requestDto) {
        CommonResponseMessage responseDto = userService.modifyUserOpen(uid, requestDto);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@LoginUser String uid, @RequestBody ChangePasswordRequestDto requestDto) {
        CommonResponseMessage responseDto = userService.changePassword(uid, requestDto);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping("/find-id/{email}")
    public ResponseEntity<?> findId(@PathVariable String email) {
        FindIdResponseDto responseDto = userService.findId(email);
        return ResponseEntity.ok()
                .body(responseDto);
    }

    @GetMapping("/find-password/{uid}/{email}")
    public ResponseEntity<?> checkIdAndEmail(@PathVariable String uid, @PathVariable String email) {
        CommonResponseMessage responseDto = userService.checkIdAndEmail(uid, email);

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @PutMapping("/find-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequestDto requestDto) {
        CommonResponseMessage responseDto = userService.changePassword(requestDto);

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
                .body(responseDto) ;
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
    public ResponseEntity<?> followUser(@LoginUser String uid, @RequestBody UidDto requestDto) {
        CommonResponseMessage responseDto = followService.followUser(uid, requestDto.getUid());

        return ResponseEntity.ok()
                .body(responseDto);
    }

    @DeleteMapping("/follow/{otherUid}")
    public ResponseEntity<?> unfollowUser(@LoginUser String uid, @PathVariable String otherUid) {
        CommonResponseMessage responseDto = followService.unfollowUser(uid, otherUid);

        return ResponseEntity.ok()
                .body(responseDto);
    }

}
