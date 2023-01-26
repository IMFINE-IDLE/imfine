package com.idle.imfine.service.impl;

import com.idle.imfine.data.dto.bamboo.request.RequestBambooDto;
import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.repository.UserRepository;
import com.idle.imfine.data.repository.bamboo.BambooRepository;
import com.idle.imfine.service.BambooService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BambooServiceImpl implements BambooService {
    @Autowired
    BambooRepository bambooRepository;

    @Autowired
    UserRepository userRepository;

    public void save(String content, String uid) {

        User user = userRepository.getByUid(uid);

        Bamboo bamboo = Bamboo.builder()
                .content(content)
                .writer(user)
                .likeCount(0)
                .declarationCount(0)
                .leafCount(0)
                .build();
        Bamboo savedBamboo = bambooRepository.save(bamboo);
        System.out.println(savedBamboo.getId());
    }

    public ResponseBamboo showList() {
        return null;
    }
}
