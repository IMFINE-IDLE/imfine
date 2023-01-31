package com.idle.imfine.data.dto.user.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FollowResponseDto implements Comparable<FollowResponseDto> {

    private String uid;
    private String name;

    // 관계: 팔로워, 팔로잉 목록에 있는 사람이
    // -> 나인 경우 0
    // -> 내가 팔로우 했으면 1,
    // -> 내가 팔로우 안했으면 2
    private int relation;

    @Override
    public int compareTo(FollowResponseDto other) {
        return this.relation - other.relation;
    }
}
