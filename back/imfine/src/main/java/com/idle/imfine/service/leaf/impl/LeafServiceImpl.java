package com.idle.imfine.service.leaf.impl;

import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.leaf.Leaf;
import com.idle.imfine.data.repository.bamboo.BambooRepository;
import com.idle.imfine.data.repository.leaf.LeafRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.service.bamboo.impl.BambooServiceImpl;
import com.idle.imfine.service.leaf.LeafService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class LeafServiceImpl implements LeafService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooServiceImpl.class);
    private final LeafRepository leafRepository;
    private final UserRepository userRepository;
    private final BambooRepository bambooRepository;
    private final HeartRepository heartRepository;

    @Override
    public void save(RequestLeafDto requestLeafDto) {

        User user = userRepository.getByUid(requestLeafDto.getWriterId());
        Bamboo bamboo = bambooRepository.getById(requestLeafDto.getBambooId());

        Leaf leaf = Leaf.builder()
            .bamboo(bamboo)
            .content(requestLeafDto.getContent())
            .likeCount(0)
            .declarationCount(0)
            .build();

        LOGGER.info("잎 등록 {}", leaf);
        leafRepository.save(leaf);
        bamboo.setLeafCount(bamboo.getLeafCount() + 1);
        bambooRepository.save(bamboo);

    }

    @Override
    public void likeLeaf(long leafId, String uid) {

        User user = userRepository.getByUid(uid);
        Leaf leaf = leafRepository.getById(leafId);
        if(!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 5, leafId)) {
            Heart heart = Heart.builder()
                .senderId(user.getId())
                .contentsCodeId(5)
                .contentsId(leafId)
                .build();

            heartRepository.save(heart);
            leaf.setLikeCount(leaf.getLikeCount() + 1);
            leafRepository.save(leaf);

        }
    }

    @Override
    public void deleteLikeLeaf(long leafId, String uid) {
        User user = userRepository.getByUid(uid);
        Leaf leaf = leafRepository.getById(leafId);

        if(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 5, leafId)) {
            heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 5, leafId);
            leaf.setLikeCount(leaf.getLikeCount() - 1);
            leafRepository.save(leaf);
        }
    }
}
