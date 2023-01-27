package com.idle.imfine.service.user;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.user.request.UidDto;

public interface FollowService {

    CommonResponseMessage followUser(String uid, String otherUid);

    CommonResponseMessage unfollowUser(String uid, String otherUid);

}
