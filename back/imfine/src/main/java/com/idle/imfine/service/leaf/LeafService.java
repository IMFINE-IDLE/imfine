package com.idle.imfine.service.leaf;

import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;

public interface LeafService {

    ResponseNotificationPost save(RequestLeafDto requestLeafDto);

    ResponseNotificationPost likeLeaf(RequestHeartDto requestHeart, String uid);

    void deleteLikeLeaf(long leafId, String uid);
}
