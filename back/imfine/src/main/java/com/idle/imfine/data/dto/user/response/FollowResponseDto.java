package com.idle.imfine.data.dto.user.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FollowResponseDto implements Comparable<FollowResponseDto> {

    private String uid;
    private String name;
    private int condition;

    // 관계: 팔로워, 팔로잉 목록에 있는 사람이 > 목록 정렬에 사용됨.
    // -> 나인 경우 0
    // -> 내가 팔로우 했으면 1,
    // -> 내가 팔로우 요청한 경우 (상대가 비공개) 2
    // -> 내가 팔로우 안한 경우 3
    private int relation;
    private boolean open;

    @Override
    public int compareTo(FollowResponseDto other) {
        return this.relation - other.relation;
    }
}
