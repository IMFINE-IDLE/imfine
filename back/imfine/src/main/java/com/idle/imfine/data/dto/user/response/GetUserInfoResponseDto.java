package com.idle.imfine.data.dto.user.response;

import com.idle.imfine.common.CommonResponseMessage;
import java.util.List;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class GetUserInfoResponseDto extends CommonResponseMessage {

    private String name;
    private Boolean open;
    private Integer followingCount;
    private Integer followerCount;
    private List<String> medicalList;

}
