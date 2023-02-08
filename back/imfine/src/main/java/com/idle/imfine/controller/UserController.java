package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.user.request.ChangePasswordRequestDto;
import com.idle.imfine.data.dto.user.request.ConditionRequestDto;
import com.idle.imfine.data.dto.user.request.InitProfileRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserMedicalListRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserNameRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserOepnRequestDto;
import com.idle.imfine.data.dto.user.request.SignInRequestDto;
import com.idle.imfine.data.dto.user.request.SignUpRequestDto;
import com.idle.imfine.data.dto.user.request.followUserRequestDto;
import com.idle.imfine.data.dto.user.response.ConditionResponseDto;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.FollowResponseDto;
import com.idle.imfine.data.dto.user.response.SearchUserInfoResponseDto;
import com.idle.imfine.data.dto.user.response.TokenResponseDto;
import com.idle.imfine.service.paper.impl.PaperServiceImpl;
import com.idle.imfine.service.user.ConditionService;
import com.idle.imfine.service.user.FollowService;
import com.idle.imfine.service.user.UserService;
import java.util.List;
import java.util.Map;
import javax.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final FollowService followService;
    private final ConditionService conditionService;
    private final ResponseService responseService;
    private final PaperServiceImpl paperService;

    @PostMapping("/sign-in")
    public ResponseEntity<Result> signIn(@RequestBody SignInRequestDto requestDto) {
        Map<String, Object> result = userService.signIn(requestDto);
        HttpHeaders headers = (HttpHeaders) result.get("headers");
        TokenResponseDto body = (TokenResponseDto) result.get("body");
        return ResponseEntity.ok()
                .headers(headers)
                .body(responseService.getSingleResult(body));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<Result> signOut(@LoginUser String loginUid) {
        HttpHeaders headers = userService.signOut(loginUid);
        return ResponseEntity.ok()
                .headers(headers)
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/refresh")
    public ResponseEntity<Result> refresh(@CookieValue(name = "refreshToken", required = false) Cookie cookie) {
        Map<String, Object> result = userService.refresh(cookie);
        HttpHeaders headers = (HttpHeaders) result.get("headers");
        TokenResponseDto body = (TokenResponseDto) result.get("body");
        return ResponseEntity.ok()
                .headers(headers)
                .body(responseService.getSingleResult(body));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Result> signUp(@RequestBody SignUpRequestDto requestDto) {
        Map<String, Object> result = userService.signUp(requestDto);
        HttpHeaders headers = (HttpHeaders) result.get("headers");
        TokenResponseDto body = (TokenResponseDto) result.get("body");
        return ResponseEntity.ok()
                .headers(headers)
                .body(responseService.getSingleResult(body));
    }

    @PutMapping("/profile")
    public ResponseEntity<Result> initProfile(@LoginUser String loginUid, @RequestBody InitProfileRequestDto requestDto) {
        userService.initProfile(loginUid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
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
    public ResponseEntity<Result> withdrawal(@LoginUser String loginUid) {
        userService.withdrawal(loginUid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/{uid}")
    public ResponseEntity<Result> searchUserInfo(@LoginUser String loginUid, @PathVariable String uid) {
        SearchUserInfoResponseDto responseDto = userService.searchUserInfo(loginUid, uid);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto));
    }

    @PutMapping("/name")
    public ResponseEntity<Result> modifyUserName(@LoginUser String loginUid, @RequestBody ModifyUserNameRequestDto requestDto) {
        userService.modifyUserName(loginUid, requestDto);

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/open")
    public ResponseEntity<Result> modifyUserOpen(@LoginUser String loginUid, @RequestBody ModifyUserOepnRequestDto requestDto) {
        userService.modifyUserOpen(loginUid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/medical")
    public ResponseEntity<Result> modifyUserMedicalList(@LoginUser String loginUid, @RequestBody ModifyUserMedicalListRequestDto requestDto) {
        userService.modifyUserMedicalList(loginUid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/change-password")
    public ResponseEntity<Result> changePassword(@LoginUser String loginUid, @RequestBody ChangePasswordRequestDto requestDto) {
        userService.changePassword(loginUid, requestDto);
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

    @GetMapping("/{uid}/condition/{date}")
    public ResponseEntity<Result> getConditionByDay(@PathVariable String uid, @PathVariable String date) {
        ConditionResponseDto responseDto = conditionService.getConditionByDay(uid, date);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto)) ;
    }

    @GetMapping("/{uid}/condition/month/{month}")
    public ResponseEntity<Result> getAllConditionByMonth(@PathVariable String uid, @PathVariable String month) {
        Map<String, String> responseDto = conditionService.getAllCondtionByMonth(uid, month);
        return ResponseEntity.ok()
                .body(responseService.getSingleResult(responseDto)) ;
    }

    @GetMapping("/{uid}/paper/{date}")
    public ResponseEntity<Result> getAllPaperByDay(@PathVariable String uid, @PathVariable String date) {
        return ResponseEntity.ok()
                .body(responseService.getListResult((paperService.getAllPaperByDate(uid, date))));
    }


    @PostMapping("/condition")
    public ResponseEntity<Result> createCondition(@LoginUser String loginUid, @RequestBody ConditionRequestDto requestDto) {
        conditionService.createCondition(loginUid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PutMapping("/condition")
    public ResponseEntity<Result> modifyCondition(@LoginUser String loginUid, @RequestBody ConditionRequestDto requestDto) {
        conditionService.modifyCondition(loginUid, requestDto);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/{uid}/following")
    public ResponseEntity<Result> searchFollowingList(@LoginUser String loginUid, @PathVariable String uid) {
        List<FollowResponseDto> responseDtoList = followService.searchFollowingList(loginUid, uid);

        return ResponseEntity.ok()
                .body(responseService.getListResult(responseDtoList));
    }

    @GetMapping("/{uid}/follower")
    public ResponseEntity<Result> searchFollowerList(@LoginUser String loginUid, @PathVariable String uid) {
        List<FollowResponseDto> responseDtoList = followService.searchFollowerList(loginUid, uid);

        return ResponseEntity.ok()
                .body(responseService.getListResult(responseDtoList));
    }

    @PostMapping("/follow")
    public ResponseEntity<Result> followUser(@LoginUser String loginUid, @RequestBody followUserRequestDto requestDto) {
        followService.followUser(loginUid, requestDto.getUid());

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/follow/{uid}")
    public ResponseEntity<Result> unfollowUser(@LoginUser String loginUid, @PathVariable String uid) {
        followService.unfollowUser(loginUid, uid);

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/follow/allow")
    public ResponseEntity<Result> allowUserRequest(@LoginUser String loginUid, @RequestBody followUserRequestDto requestDto) {
        followService.allowUserRequest(loginUid, requestDto.getUid());
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @DeleteMapping("/follow/decline/{uid}")
    public ResponseEntity<Result> declineuserRequest(@LoginUser String loginUid, @PathVariable String uid) {
        followService.declineUserRequest(loginUid, uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

}
