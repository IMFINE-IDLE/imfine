package com.idle.imfine.service.user;

import com.idle.imfine.data.dto.user.request.*;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SearchUserInfoResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;
import com.idle.imfine.data.entity.User;

public interface UserService {

    SignInResponseDto signUp(SignUpRequestDto requestDto);

    SignInResponseDto signIn(SignInRequestDto requestDto);

    void signOut(String uid);

    RefreshResponseDto refresh(String refreshToken);

    void checkUidDuplicate(String uid);

    void checkNameDuplicate(String name);

    void checkEmailDuplicate(String email);

    void withdrawal(String uid);

    SearchUserInfoResponseDto searchUserInfo(String uid);

    SearchUserInfoResponseDto searchUserInfo(String uid, String otherUid);

    void modifyUserName(String uid, ModifyUserNameRequestDto requestDto);

    void modifyUserOpen(String uid, ModifyUserOepnRequestDto requestDto);

//    CommonResponseMessage modifyUserMedicalList(String uid, ModifyUserMedicalListRequestDto requestDto);

    void changePassword(ChangePasswordRequestDto requestDto);

    FindIdResponseDto findId(String email);

    void checkIdAndEmail(String uid, String email);

    void changePassword(String uid, ChangePasswordRequestDto requestDto);

}
