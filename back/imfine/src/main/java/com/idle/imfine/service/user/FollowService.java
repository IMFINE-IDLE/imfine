package com.idle.imfine.service.user;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.UidDto;

public interface FollowService {

    void followUser(String uid, String otherUid);

    void unfollowUser(String uid, String otherUid);

}
