package com.idle.imfine.service.user;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.SignInRequestDto;
import com.idle.imfine.data.dto.user.request.SignUpRequestDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;

import javax.servlet.http.HttpServletRequest;

public interface SignService {

    CommonResponseMessage signUp(SignUpRequestDto requestDto);

    SignInResponseDto signIn(SignInRequestDto requestDto) throws RuntimeException;

    CommonResponseMessage signOut(String uid);

    RefreshResponseDto refresh(HttpServletRequest request);

}