package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.user.request.*;
import com.idle.imfine.data.dto.user.response.*;
import com.idle.imfine.service.user.ConditionService;
import com.idle.imfine.service.user.FollowService;
import com.idle.imfine.service.user.SignService;
import com.idle.imfine.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);

    private final SignService signService;
    private final UserService userService;
    private final FollowService followService;
    private final ConditionService conditionService;
    private final ResponseService responseService;

    @PostMapping("/sign-in")
    public ResponseEntity<Result> signIn(@RequestBody SignInRequestDto requestDto) {
        SignInResponseDto responseDto = signService.signIn(requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<Result> signOut(@LoginUser String uid) {
        signService.signOut(uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/refresh")
    public ResponseEntity<Result> refresh(@RequestHeader(name = "X-AUTH-TOKEN") String refreshToken) {
        RefreshResponseDto responseDto = signService.refresh(refreshToken);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Result> signUp(@RequestBody SignUpRequestDto requestDto) {
        SignInResponseDto responseDto = signService.signUp(requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @GetMapping("/check/uid/{uid}")
    public ResponseEntity<Result> checkUidDuplicate(@PathVariable String uid) {
        userService.checkUidDuplicate(uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/check/name/{name}")
    public ResponseEntity<Result> checkNameDuplicate(@PathVariable String name) {
        userService.checkNameDuplicate(name);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<Result> checkEmailDuplicate(@PathVariable String email) {
        userService.checkEmailDuplicate(email);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping
    public ResponseEntity<Result> withdrawal(@LoginUser String uid) {
        userService.withdrawal(uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping
    public ResponseEntity<Result> searchUserInfo(@LoginUser String uid) {
        GetUserInfoResponseDto responseDto = userService.searchUserInfo(uid);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @GetMapping("/{uid}")
    public ResponseEntity<Result> searchOtherUserInfo(@PathVariable String otherUid) {
        GetUserInfoResponseDto responseDto = userService.searchUserInfo(otherUid);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @PutMapping("/name")
    public ResponseEntity<Result> modifyUserName(@LoginUser String uid, @RequestBody ModifyUserNameRequestDto requestDto) {
        userService.modifyUserName(uid, requestDto);

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/open")
    public ResponseEntity<Result> modifyUserOpen(@LoginUser String uid, @RequestBody ModifyUserOepnRequestDto requestDto) {
        userService.modifyUserOpen(uid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/change-password")
    public ResponseEntity<Result> changePassword(@LoginUser String uid, @RequestBody ChangePasswordRequestDto requestDto) {
        userService.changePassword(uid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/find-id/{email}")
    public ResponseEntity<Result> findId(@PathVariable String email) {
        FindIdResponseDto responseDto = userService.findId(email);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @GetMapping("/find-password/{uid}/{email}")
    public ResponseEntity<Result> checkIdAndEmail(@PathVariable String uid, @PathVariable String email) {
        userService.checkIdAndEmail(uid, email);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/find-password")
    public ResponseEntity<Result> changePassword(@RequestBody ChangePasswordRequestDto requestDto) {
        userService.changePassword(requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }


    @GetMapping("/condition/{uid}/day/{day}")
    public ResponseEntity<Result> getConditionByDay(@PathVariable String uid, @PathVariable String day) {
        ConditionResponseDto responseDto = conditionService.getConditionByDay(uid, day);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto)) ;
    }

    @GetMapping("/condition/{uid}/month/{month}")
    public ResponseEntity<Result> getAllConditionByMonth(@PathVariable String uid, @PathVariable String month) {
        Map<LocalDate, Integer> responseDto = conditionService.getAllCondtionByMonth(uid, month);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto)) ;
    }

    @PostMapping("/condition")
    public ResponseEntity<Result> createCondition(@LoginUser String uid, @RequestBody ConditionRequestDto requestDto) {
        conditionService.createCondition(uid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/condition")
    public ResponseEntity<Result> modifyCondition(@LoginUser String uid, @RequestBody ConditionRequestDto requestDto) {
        conditionService.modifyCondition(uid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/{uid}/following")
    public ResponseEntity<Result> searchFollowingList(@PathVariable String uid) {

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/{uid}/follower")
    public ResponseEntity<Result> searchFollowerList(@PathVariable String uid) {

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/follow")
    public ResponseEntity<Result> followUser(@LoginUser String uid, @RequestBody UidDto requestDto) {
        followService.followUser(uid, requestDto.getUid());

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/follow/{otherUid}")
    public ResponseEntity<Result> unfollowUser(@LoginUser String uid, @PathVariable String otherUid) {
        followService.unfollowUser(uid, otherUid);

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

}
