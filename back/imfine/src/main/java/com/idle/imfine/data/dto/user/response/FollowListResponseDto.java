package com.idle.imfine.data.dto.user.response;

import java.util.List;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class FollowListResponseDto {

    private List<Object> userList;

}
