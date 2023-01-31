package com.idle.imfine.service.user.Impl;

import com.idle.imfine.data.dto.user.response.FollowResponseDto;
import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.errors.code.FollowErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.user.FollowService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final Logger LOGGER = LoggerFactory.getLogger(FollowServiceImpl.class);
    private final Common common;
    private final FollowRepository followRepository;


    @Override
    public void followUser(String uid, String otherUid) {
        LOGGER.info("팔로우 신청");

        if (uid.equals(otherUid)) {
            LOGGER.info("나를 팔로우할 수 없습니다.");
            throw new ErrorException(FollowErrorCode.FOLLOW_ERROR_CODE);
        }

        LOGGER.info("유저 정보 조회");
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);
        LOGGER.info("유저 정보 조회 완료");

        if (followRepository.existsByFollowingUserAndFollowedUser(user, other)) {
            LOGGER.info("이미 팔로우하고 있습니다.");
            throw new ErrorException(FollowErrorCode.FOLLOW_ERROR_CODE);
        } else if (!other.isOpen() && !followRepository.existsByFollowingUserAndFollowedUser(other, user)) {
            LOGGER.info("상대방이 비공개이므로 팔로우 신청을 보냈습니다.");
            throw new ErrorException(FollowErrorCode.FOLLOW_ERROR_CODE);
        }

        Follow follow = Follow.builder()
                .followingUser(user)
                .followedUser(other)
                .build();

        common.increaseFollowingCount(user);
        common.increaseFollwerCount(other);
        followRepository.save(follow);
        LOGGER.info("팔로우가 완료되었습니다.");
    }

    @Override
    public void unfollowUser(String uid, String otherUid) {
        LOGGER.info("언팔로우 신청");
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);
        LOGGER.info("유저 정보 조회 완료");

        if (!followRepository.existsByFollowingUserAndFollowedUser(user, other)) {
            LOGGER.info("이미 팔로우하고 있지않습니다.");
            throw new ErrorException(FollowErrorCode.FOLLOW_ERROR_CODE);
        }

        common.decreaseFollowingCount(user);
        common.decreaseFollowerCount(other);
        followRepository.deleteByFollowingUserAndFollowedUser(user, other);
        LOGGER.info("언팔로우가 완료되었습니다.");
    }

    @Override
    public List<FollowResponseDto> searchFollowingList(String uid, String targetUid) {
        LOGGER.info("팔로잉 목록 조회");
        User user = common.getUserByUid(uid);
        User target = common.getUserByUid(targetUid);

        List<FollowResponseDto> responseDtoList = new ArrayList<>();
        List<Follow> followList = followRepository.findAllByFollowingUser(target);

        for (Follow follow : followList) {
            User following = follow.getFollowedUser();
            int relation = common.getFollowRelation(user, following);
            FollowResponseDto responseDto = FollowResponseDto.builder()
                    .uid(following.getUid())
                    .name(following.getName())
                    .relation(relation)
                    .build();
            responseDtoList.add(responseDto);
        }

        Collections.sort(responseDtoList);

        return responseDtoList;
    }

    @Override
    public List<FollowResponseDto> searchFollowerList(String uid, String targetUid) {
        LOGGER.info("팔로워 목록 조회");
        User user = common.getUserByUid(uid);
        User target = common.getUserByUid(targetUid);

        List<FollowResponseDto> responseDtoList = new ArrayList<>();
        List<Follow> followList = followRepository.findAllByFollowedUser(target);

        for (Follow follow : followList) {
            User follower = follow.getFollowingUser();
            int relation = common.getFollowRelation(user, follower);
            FollowResponseDto responseDto = FollowResponseDto.builder()
                    .uid(follower.getUid())
                    .name(follower.getName())
                    .relation(relation)
                    .build();
            responseDtoList.add(responseDto);
        }

        Collections.sort(responseDtoList);

        return responseDtoList;
    }


}
