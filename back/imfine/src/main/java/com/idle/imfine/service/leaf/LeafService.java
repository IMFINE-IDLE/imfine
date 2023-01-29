package com.idle.imfine.service.leaf;

import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;

public interface LeafService {

    void save(RequestLeafDto requestLeafDto);

    void likeLeaf(int leafId, String uid);

    void deleteLikeLeaf(int leafId, String uid);
}
