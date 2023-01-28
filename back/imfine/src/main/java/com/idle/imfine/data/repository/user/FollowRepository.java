package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByFollowingUserAndFollowedUser(User followingUser, User followedUser);

    void deleteAllByFollowingUserAndFollowedUser(User followingUser, User followedUser);

}
