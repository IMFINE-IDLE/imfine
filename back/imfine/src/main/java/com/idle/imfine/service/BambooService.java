package com.idle.imfine.service;

import com.idle.imfine.data.dto.bamboo.request.RequestBambooDto;
import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.entity.bamboo.Bamboo;

public interface BambooService {
    void save(String content, String uid);

    ResponseBamboo showList();
}
