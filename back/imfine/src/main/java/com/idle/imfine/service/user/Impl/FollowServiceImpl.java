package com.idle.imfine.service.user.Impl;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.FollowRepository;
import com.idle.imfine.data.repository.UserRepository;
import com.idle.imfine.service.user.FollowService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final Logger LOGGER = LoggerFactory.getLogger(SignServiceImpl.class);

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Override
    public CommonResponseMessage followUser(String uid, String otherUid) {
        LOGGER.info("팔로우 신청");
        User user = userRepository.getByUid(uid);
        User other = userRepository.getByUid(otherUid);
        LOGGER.info("유저 정보 조회 완료");

        CommonResponseMessage responseDto;


        if (followRepository.findByFollowingUserAndFollowedUser(user, other) != null) {
            LOGGER.info("이미 팔로우하고 있습니다.");
            responseDto = CommonResponseMessage.builder()
                    .success(false)
                    .status(-1)
                    .message(String.format("%s님은 %s님을 이미 팔로우하고 있습니다.", uid, otherUid))
                    .build();

            return responseDto;
        }

        if (other.isOpen() || followRepository.findByFollowingUserAndFollowedUser(other, user) != null) {
            LOGGER.info("팔로우가 완료되었습니다.");
            int userFollowingCount = user.getFollowingCount();
            int otherFollowerCount = user.getFollowerCount();

            user.setFollowingCount(userFollowingCount + 1);
            other.setFollowerCount(otherFollowerCount + 1);

            Follow follow = Follow.builder()
                    .followingUser(user)
                    .followedUser(other)
                    .build();

            userRepository.save(user);
            userRepository.save(other);
            followRepository.save(follow);

            responseDto = CommonResponseMessage.builder()
                    .success(true)
                    .status(200)
                    .message(String.format("%s님이 %s님을 팔로우 성공했습니다.", uid, otherUid))
                    .build();

            return responseDto;
        } else {
            LOGGER.info("상대방이 비공개이므로 팔로우 신청을 보냈습니다.");

        }

        return null;
    }

    @Override
    public CommonResponseMessage unfollowUser(String uid, String otherUid) {
        LOGGER.info("언팔로우");
        User user = userRepository.getByUid(uid);
        User other = userRepository.getByUid(otherUid);
        LOGGER.info("유저 정보 조회 완료");

        CommonResponseMessage responseDto;

        followRepository.deleteAllByFollowingUserAndFollowedUser(user, other);

        responseDto = CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message(String.format("%s님이 %s님을 언팔로우 성공했습니다.", uid, otherUid))
                .build();

        return responseDto;
    }

}
