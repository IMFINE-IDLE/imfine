package com.idle.imfine.data.dto.user.response;

import com.idle.imfine.common.CommonResponseMessage;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class SignInResponseDto extends CommonResponseMessage {

    private String accessToken;
    private String refreshToken;

}
