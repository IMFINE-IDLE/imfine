package com.idle.imfine.service.user;

import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;
import com.idle.imfine.data.dto.user.response.FollowResponseDto;

import java.util.List;

public interface FollowService {

    ResponseNotificationPost followUser(String uid, String otherUid);

    void unfollowUser(String uid, String otherUid);

    void allowUserRequest(String uid, String otherUid);

    void declineUserRequest(String uid, String otherUid);

    void blockFollower(String uid, String otherUid);

    List<FollowResponseDto> searchFollowingList(String uid, String otherUid);

    List<FollowResponseDto> searchFollowerList(String uid, String otherUid);

}
