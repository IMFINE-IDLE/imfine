package com.idle.imfine.data.dto.user.response;

import com.idle.imfine.common.CommonResponseMessage;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@Builder
public class FindIdResponseDto {

    private String uid;

}
