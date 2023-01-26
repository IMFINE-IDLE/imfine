package com.idle.imfine.service.user;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.ChangePasswordRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserMedicalListRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserNameRequestDto;
import com.idle.imfine.data.dto.user.request.ModifyUserOepnRequestDto;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.GetUserInfoResponseDto;

public interface UserService {

    CommonResponseMessage withdrawal(String uid);

    GetUserInfoResponseDto searchUserInfo(String uid);

    CommonResponseMessage modifyUserName(String uid, ModifyUserNameRequestDto requestDto);

    CommonResponseMessage modifyUserOpen(String uid, ModifyUserOepnRequestDto requestDto);

//    CommonResponseMessage modifyUserMedicalList(String uid, ModifyUserMedicalListRequestDto requestDto);

    CommonResponseMessage changePassword(ChangePasswordRequestDto requestDto);

    FindIdResponseDto findId(String email);

    CommonResponseMessage checkIdAndEmail(String uid, String email);

    CommonResponseMessage changePassword(String uid, ChangePasswordRequestDto requestDto);

}
