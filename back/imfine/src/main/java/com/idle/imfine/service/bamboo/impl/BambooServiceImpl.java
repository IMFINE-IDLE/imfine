package com.idle.imfine.service.bamboo.impl;

import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.repository.UserRepository;
import com.idle.imfine.data.repository.bamboo.BambooRepository;
import com.idle.imfine.data.repository.like.HeartRepository;
import com.idle.imfine.service.bamboo.BambooService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class BambooServiceImpl implements BambooService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooServiceImpl.class);
    private final BambooRepository bambooRepository;
    private final UserRepository userRepository;
    private final HeartRepository likeRepository;

    @Override
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

    @Override
    public List<ResponseBamboo> showList(String filter) {

        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();

        List<ResponseBamboo> responseBambooList = new ArrayList<>();

        if (filter.equals("popular")) {

            List<Bamboo> all = bambooRepository.findByCreatedAtBetweenOrderByLikeCountDesc(start, end);

            for(Bamboo b : all) {
                ResponseBamboo responseBamboo = ResponseBamboo.builder()
                        .bambooId(b.getId())
                        .content(b.getContent())
                        .createdDate(b.getCreatedAt())
                        .likeCount(b.getLikeCount())
                        .leafCount(b.getLeafCount())
                        .build();
                responseBambooList.add(responseBamboo);
            }
        } else if (filter.equals("oldest")) {

            List<Bamboo> all = bambooRepository.findByCreatedAtBetweenOrderByCreatedAtAsc(start, end);

            for(Bamboo b : all) {
                ResponseBamboo responseBamboo = ResponseBamboo.builder()
                        .bambooId(b.getId())
                        .content(b.getContent())
                        .createdDate(b.getCreatedAt())
                        .likeCount(b.getLikeCount())
                        .leafCount(b.getLeafCount())
                        .build();
                responseBambooList.add(responseBamboo);
            }
        } else {

            List<Bamboo> all = bambooRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(start, end);

            for(Bamboo b : all) {
                ResponseBamboo responseBamboo = ResponseBamboo.builder()
                        .bambooId(b.getId())
                        .content(b.getContent())
                        .createdDate(b.getCreatedAt())
                        .likeCount(b.getLikeCount())
                        .leafCount(b.getLeafCount())
                        .build();
                responseBambooList.add(responseBamboo);
            }
        }
        return responseBambooList;
    }

    @Override
    public List<ResponseBamboo> showMyList(String filter, String uid) {
        return null;
    }

    @Override
    @Transactional
    public void likeBamboo(int bambooId, String uid) {

        User user = userRepository.getByUid(uid);
        Bamboo bamboo = bambooRepository.getById(bambooId);
        if(!likeRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId)) {
            Heart heart = Heart.builder()
                    .senderId(user.getId())
                    .contentsCodeId(4)
                    .contentsId(bambooId)
                    .build();

            likeRepository.save(heart);
            bamboo.setLikeCount(bamboo.getLikeCount() + 1);
            bambooRepository.save(bamboo);
        }
    }

    @Override
    public void deleteLikeBamboo(int bambooId, String uid) {
        User user = userRepository.getByUid(uid);
        Bamboo bamboo = bambooRepository.getById(bambooId);

        if(likeRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId)) {
            likeRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId);
            bamboo.setLikeCount(bamboo.getLikeCount() - 1);
            bambooRepository.save(bamboo);
        }
    }
}
