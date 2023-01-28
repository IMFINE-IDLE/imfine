package com.idle.imfine.service.user;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.SignInRequestDto;
import com.idle.imfine.data.dto.user.request.SignUpRequestDto;
import com.idle.imfine.data.dto.user.response.RefreshResponseDto;
import com.idle.imfine.data.dto.user.response.SignInResponseDto;

import javax.servlet.http.HttpServletRequest;

public interface SignService {

    void signUp(SignUpRequestDto requestDto);

    SignInResponseDto signIn(SignInRequestDto requestDto) throws RuntimeException;

    void signOut(String uid);

    RefreshResponseDto refresh(HttpServletRequest request);

}