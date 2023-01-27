package com.idle.imfine.service.bamboo;

import com.idle.imfine.data.dto.bamboo.request.RequestBambooDto;
import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import java.util.List;

public interface BambooService {
    void save(String content, String uid);

    List<ResponseBamboo> showList(String filter);

    List<ResponseBamboo> showMyList(String filter, String uid);

    void likeBamboo(int bambooId, String uid);

    void deleteLikeBamboo(int bambooId, String uid);
}
