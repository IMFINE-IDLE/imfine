package com.idle.imfine.service.user;

public interface FollowService {

    void followUser(String uid, String otherUid);

    void unfollowUser(String uid, String otherUid);

}
