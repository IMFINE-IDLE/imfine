package com.idle.imfine.service.leaf.impl;

import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.leaf.request.RequestLeafDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.leaf.Leaf;
import com.idle.imfine.data.repository.bamboo.BambooRepository;
import com.idle.imfine.data.repository.leaf.LeafRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.BambooErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.bamboo.impl.BambooServiceImpl;
import com.idle.imfine.service.leaf.LeafService;
import java.time.LocalDateTime;
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
    public ResponseNotificationPost save(RequestLeafDto requestLeafDto) {

        User user = userRepository.getByUid(requestLeafDto.getWriterId());
        Bamboo bamboo = bambooRepository.getById(requestLeafDto.getBambooId());
        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);

        if (LocalDateTime.now().isAfter(endShowTime)) {
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        Leaf leaf = Leaf.builder()
                .bamboo(bamboo)
                .content(requestLeafDto.getContent())
                .writer(user)
                .likeCount(0)
                .declarationCount(0)
                .build();

        leafRepository.save(leaf);
        LOGGER.info("잎 등록 service {}", leaf);
        bamboo.setLeafCount(bamboo.getLeafCount() + 1);

        return new ResponseNotificationPost(user.getId(), bamboo.getWriter().getId(), 4, bamboo.getId(), 4);
    }

    @Override
    public ResponseNotificationPost likeLeaf(RequestHeartDto requestHeart, String uid) {

        User user = userRepository.getByUid(uid);
        Leaf leaf = leafRepository.getById(requestHeart.getContentId());
        Bamboo bamboo = bambooRepository.getById(leaf.getBamboo().getId());
        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);

        if (LocalDateTime.now().isAfter(endShowTime)) {
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        if(!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 5, leaf.getId())) {
            Heart heart = Heart.builder()
                .senderId(user.getId())
                .contentsCodeId(5)
                .contentsId(leaf.getId())
                .build();

            heartRepository.save(heart);
            leaf.setLikeCount(leaf.getLikeCount() + 1);
        }
        LOGGER.info("대나무 잎 좋아요 등록 service {}", requestHeart.getContentId());
        return new ResponseNotificationPost(user.getId(), leaf.getWriter().getId(), 4, bamboo.getId(), 35);
    }

    @Override
    public void deleteLikeLeaf(long leafId, String uid) {
        User user = userRepository.getByUid(uid);
        Leaf leaf = leafRepository.getById(leafId);
        Bamboo bamboo = bambooRepository.getById(leaf.getBamboo().getId());
        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);

        if (LocalDateTime.now().isAfter(endShowTime)) {
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        if(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 5, leafId)) {
            heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 5, leafId);
            leaf.setLikeCount(leaf.getLikeCount() - 1);
        }
        LOGGER.info("대나무 잎 좋아요 삭제 service");
    }
}
