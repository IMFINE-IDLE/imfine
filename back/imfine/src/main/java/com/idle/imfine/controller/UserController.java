package com.idle.imfine.controller;

import com.idle.imfine.common.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.user.request.ChangePasswordRequestDto;
import com.idle.imfine.data.dto.user.request.ConditionRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserNameRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserOepnRequestDto;
import com.idle.imfine.data.dto.user.request.SignInRequestDto;
import com.idle.imfine.data.dto.user.request.SignUpRequestDto;
import com.idle.imfine.data.dto.user.request.UidDto;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.GetUserInfoResponseDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;
import com.idle.imfine.service.user.FollowService;
import com.idle.imfine.service.user.SignService;
import com.idle.imfine.service.user.UserService;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooController.class);

    private final SignService signService;
    private final UserService userService;
    private final FollowService followService;
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
    public ResponseEntity<Result> refresh(HttpServletRequest request) {
        RefreshResponseDto responseDto = signService.refresh(request);

        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Result> signUp(@RequestBody SignUpRequestDto requestDto) {
        signService.signUp(requestDto);
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
    public ResponseEntity<Result> searchOtherUserInfo(@PathVariable String uid) {
        GetUserInfoResponseDto responseDto = userService.searchUserInfo(uid);
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


    @GetMapping("/condition/{id}/{date}")
    public ResponseEntity<Result> searchCondition(@PathVariable String id, @PathVariable String date) {

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult()) ;
    }

    @PostMapping("/condition")
    public ResponseEntity<Result> createCondition(@RequestBody ConditionRequestDto requestDto) {

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/condition")
    public ResponseEntity<Result> modifyCondition(@RequestBody ConditionRequestDto requestDto) {

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/condition/{date}")
    public ResponseEntity<Result> removeCondition(@PathVariable String date) {

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
