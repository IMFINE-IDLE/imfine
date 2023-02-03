package com.idle.imfine.service.leaf;

import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;

public interface LeafService {

    void save(RequestLeafDto requestLeafDto);

    void likeLeaf(RequestHeartDto requestHeart, String uid);

    void deleteLikeLeaf(long leafId, String uid);
}
