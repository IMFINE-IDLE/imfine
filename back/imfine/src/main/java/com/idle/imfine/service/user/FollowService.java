package com.idle.imfine.service.user;

import com.idle.imfine.data.dto.user.response.FollowResponseDto;
import com.idle.imfine.data.entity.User;

import java.util.List;

public interface FollowService {

    void followUser(String uid, String otherUid);

    void unfollowUser(String uid, String otherUid);

    List<FollowResponseDto> searchFollowingList(String uid, String otherUid);

    List<FollowResponseDto> searchFollowerList(String uid, String otherUid);

}
