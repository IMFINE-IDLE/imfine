package com.idle.imfine.data.dto.user.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignInResponseDto {

    private String accessToken;
    private String refreshToken;

}
