package com.idle.imfine.data.dto.user.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchUserInfoResponseDto {

    private String name;
    private Boolean open;
    private Integer followingCount;
    private Integer followerCount;
    private List<String> medicalList;
    private int condition;
    private int relation;

}
