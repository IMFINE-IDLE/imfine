package com.idle.imfine.service.user;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.ChangePasswordRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserMedicalListRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserNameRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserOepnRequestDto;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.GetUserInfoResponseDto;

public interface UserService {

    void withdrawal(String uid);

    GetUserInfoResponseDto searchUserInfo(String uid);

    void modifyUserName(String uid, ModifyUserNameRequestDto requestDto);

    void modifyUserOpen(String uid, ModifyUserOepnRequestDto requestDto);

//    CommonResponseMessage modifyUserMedicalList(String uid, ModifyUserMedicalListRequestDto requestDto);

    void changePassword(ChangePasswordRequestDto requestDto);

    FindIdResponseDto findId(String email);

    void checkIdAndEmail(String uid, String email);

    void changePassword(String uid, ChangePasswordRequestDto requestDto);

}
