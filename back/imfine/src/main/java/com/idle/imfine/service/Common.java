package com.idle.imfine.service;

import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class Common {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public User getUserByUid(String uid) {
        return userRepository.findByUid(uid)
                .orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
    }

    public int getFollowRelation(User user, User other) {
        if (user == other) {
            return 0;
        } else if (followRepository.existsByFollowingUserAndFollowedUser(user, other)) {
            return 1;
        }
        return 2;
    }

    public void increaseFollowingCount(User user) {
        int count = user.getFollowingCount();
        user.setFollowingCount(count + 1);
        userRepository.save(user);
    }

    public void decreaseFollowingCount(User user) {
        int count = user.getFollowingCount();
        user.setFollowingCount(count - 1);
        userRepository.save(user);
    }

    public void increaseFollwerCount(User user) {
        int count = user.getFollowerCount();
        user.setFollowerCount(count + 1);
        userRepository.save(user);
    }

    public void decreaseFollowerCount(User user) {
        int count = user.getFollowerCount();
        user.setFollowerCount(count - 1);
        userRepository.save(user);
    }

    public LocalDate convertDateType(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, formatter);
    }

}
