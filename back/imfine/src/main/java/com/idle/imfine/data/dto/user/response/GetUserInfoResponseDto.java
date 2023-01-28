package com.idle.imfine.data.dto.user.response;

import com.idle.imfine.common.CommonResponseMessage;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@Builder
public class GetUserInfoResponseDto {

    private String name;
    private Boolean open;
    private Integer followingCount;
    private Integer followerCount;
    private List<String> medicalList;

}
