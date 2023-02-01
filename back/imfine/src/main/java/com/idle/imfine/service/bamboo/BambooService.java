package com.idle.imfine.service.bamboo;

import com.idle.imfine.data.dto.bamboo.request.RequestBambooDto;
import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.dto.bamboo.response.ResponseBambooDetailDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface BambooService {
    void save(RequestBambooDto requestBamboo);

    List<ResponseBamboo> showList(String filter, Pageable pageable);

    List<ResponseBamboo> showMyList(String filter, String uid, Pageable pageable);

    ResponseBambooDetailDto showBambooDetail(long bambooId, String uid);

    void likeBamboo(RequestHeartDto requestHeartDto, String uid);

    void deleteLikeBamboo(long bambooId, String uid);

    void deleteBamboo();
}
