package com.idle.imfine.service.common;

import com.idle.imfine.data.entity.User;

public interface commonService {

    User getUserByUid(String uid);
    int getRelation(User user, User other);

}
