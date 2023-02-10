package com.idle.imfine.service.user.Impl;

import com.idle.imfine.data.dto.user.response.FollowResponseDto;
import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.FollowWait;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.notification.Notification;
import com.idle.imfine.data.repository.notification.NotificationRepository;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.data.repository.user.FollowWaitRepository;
import com.idle.imfine.errors.code.FollowErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.notification.NotificationService;
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
    private final FollowWaitRepository followWaitRepository;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;

    @Override
    public void followUser(String uid, String otherUid) {
        LOGGER.info("[followUser] 팔로우 신청");

        if (uid.equals(otherUid)) {
            LOGGER.info("[followUser] 나를 팔로우할 수 없습니다.");
            throw new ErrorException(FollowErrorCode.CANNOT_FOLLOW_ME);
        }

        LOGGER.info("[followUser] 유저 정보 조회");
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);
        LOGGER.info("[followUser] 유저 정보 조회 완료");

        if (followRepository.existsByFollowingUserAndFollowedUser(user, other)) {
            LOGGER.info("[followUser] 이미 팔로우하고 있습니다.");
            throw new ErrorException(FollowErrorCode.ALREADY_FOLLOWING);
        } else if (!other.isOpen() && !followRepository.existsByFollowingUserAndFollowedUser(other, user)) {
            LOGGER.info("[followUser] 비공개 유저에게 팔로우를 신청했습니다.");

            if (followWaitRepository.existsByRequesterAndReceiver(other, user)) {
                LOGGER.info("[followUser] 이미 팔로우 요청 중입니다.");
                throw new ErrorException(FollowErrorCode.ALREADY_FOLLOW_REQUEST);
            }

            FollowWait followWait = FollowWait.builder()
                    .requester(user)
                    .receiver(other)
                    .build();
            followWaitRepository.save(followWait);
            notificationService.send(user.getId(), other.getId(), 6, user.getId(), 6);
            LOGGER.info("[followUser] 상대방에게 팔로우 요청을 보냈습니다.");
            return;
        }

        Follow follow = Follow.builder()
                .followingUser(user)
                .followedUser(other)
                .build();

        common.increaseFollowingCount(user);
        common.increaseFollwerCount(other);
        followRepository.save(follow);
        notificationService.send(user.getId(), other.getId(), 6, user.getId(), 5);
        LOGGER.info("[followUser] 팔로우가 완료되었습니다.");
    }

    @Override
    public void unfollowUser(String uid, String otherUid) {
        LOGGER.info("[unfollowUser] 언팔로우 신청");
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);
        LOGGER.info("[unfollowUser] 유저 정보 조회 완료");

        if (!followRepository.existsByFollowingUserAndFollowedUser(user, other)) {
            LOGGER.info("[unfollowUser] 이미 팔로우하고 있지않습니다.");
            throw new ErrorException(FollowErrorCode.NOT_ALREADY_FOLLOWING);
        }

        common.decreaseFollowingCount(user);
        common.decreaseFollowerCount(other);
        followRepository.deleteByFollowingUserAndFollowedUser(user, other);
        LOGGER.info("[unfollowUser] 언팔로우가 완료되었습니다.");
    }

    @Override
    public void allowUserRequest(String uid, String otherUid) {
        User user = common.getUserByUid(uid);
        User requester = common.getUserByUid(otherUid);
        LOGGER.info("[allowUserRequest] 유저 정보 조회 완료");

        if (!followWaitRepository.existsByRequesterAndReceiver(requester, user)) {
            LOGGER.info("[allowUserRequest] 팔로우 요청이 없습니다.");
            throw new ErrorException(FollowErrorCode.NOT_ALREADY_FOLLOW_REQUEST);
        } else if (followRepository.existsByFollowingUserAndFollowedUser(requester, user)) {
            LOGGER.info("[allowUserRequest] 이미 팔로워입니다.");
            throw new ErrorException((FollowErrorCode.ALREADY_FOLLOWING));
        }

        Follow follow = Follow.builder()
                .followingUser(requester)
                .followedUser(user)
                .build();

        common.increaseFollowingCount(requester);
        common.increaseFollwerCount(user);

        followRepository.save(follow);
        followWaitRepository.deleteByRequesterAndReceiver(requester, user);

        Notification notification = notificationRepository.getByRecieverIdAndSenderIdAndType(
                user.getId(), requester.getId(), 6);
        notification.setType(7);

        LOGGER.info("[allowUserRequest] 팔로우 요청을 수락했습니다.");
    }

    @Override
    public void declineUserRequest(String uid, String otherUid) {
        User user = common.getUserByUid(uid);
        User requester = common.getUserByUid(otherUid);
        LOGGER.info("[declineUserRequest] 유저 정보 조회 완료");

        if (!followWaitRepository.existsByRequesterAndReceiver(requester, user)) {
            LOGGER.info("[declineUserRequest] 이미 팔로우 요청 중이 아닙니다.");
            throw new ErrorException(FollowErrorCode.NOT_ALREADY_FOLLOW_REQUEST);
        }

        followWaitRepository.deleteByRequesterAndReceiver(requester, user);

        Notification notification = notificationRepository.getByRecieverIdAndSenderIdAndType(
                user.getId(), requester.getId(), 6);
        notification.setType(8);

        LOGGER.info("[declineUserRequest] 팔로우 요청을 거절했습니다.");
    }

    @Override
    public void blockFollower(String uid, String otherUid) {
        LOGGER.info("[blockFollower] 팔로워 차단하기 시작");
        User user = common.getUserByUid(uid);
        User other = common.getUserByUid(otherUid);
        LOGGER.info("[blockFollower] 유저 정보 조회 완료");

        if (!followRepository.existsByFollowingUserAndFollowedUser(other, user)) {
            LOGGER.info("[blockFollower] 상대가 이미 팔로우하고 있지않습니다.");
            throw new ErrorException(FollowErrorCode.NOT_ALREADY_FOLLOWING);
        }

        common.decreaseFollowingCount(other);
        common.decreaseFollowerCount(user);
        followRepository.deleteByFollowingUserAndFollowedUser(other, user);
        LOGGER.info("[blockFollower] 팔로워 차단이 완료되었습니다.");
    }


    @Override
    public List<FollowResponseDto> searchFollowingList(String uid, String targetUid) {
        LOGGER.info("[searchFollowingList] 팔로잉 목록 조회");
        User user = common.getUserByUid(uid);
        User target = common.getUserByUid(targetUid);

        List<FollowResponseDto> responseDtoList = new ArrayList<>();
        List<Follow> followList = followRepository.findAllByFollowingUser(target);

        for (Follow follow : followList) {
            User following = follow.getFollowedUser();
            int condition = common.getTodayUserCondition(following);
            int relation = common.getFollowRelation(user, following);
            FollowResponseDto responseDto = FollowResponseDto.builder()
                    .uid(following.getUid())
                    .name(following.getName())
                    .condition(condition)
                    .relation(relation)
                    .build();
            responseDtoList.add(responseDto);
        }

        Collections.sort(responseDtoList);

        return responseDtoList;
    }

    @Override
    public List<FollowResponseDto> searchFollowerList(String uid, String targetUid) {
        LOGGER.info("[searchFollowerList] 팔로워 목록 조회");
        User user = common.getUserByUid(uid);
        User target = common.getUserByUid(targetUid);

        List<FollowResponseDto> responseDtoList = new ArrayList<>();
        List<Follow> followList = followRepository.findAllByFollowedUser(target);

        for (Follow follow : followList) {
            User follower = follow.getFollowingUser();
            int condition = common.getTodayUserCondition(follower);
            int relation = common.getFollowRelation(user, follower);
            FollowResponseDto responseDto = FollowResponseDto.builder()
                    .uid(follower.getUid())
                    .name(follower.getName())
                    .condition(condition)
                    .relation(relation)
                    .build();
            responseDtoList.add(responseDto);
        }

        Collections.sort(responseDtoList);

        return responseDtoList;
    }


}
