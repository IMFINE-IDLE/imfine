package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    boolean existsByFollowingUserAndFollowedUser(User followingUser, User followedUser);

    Optional<Follow> findByFollowingUserAndFollowedUser(User followingUser, User followedUser);

    List<Follow> findAllByFollowingUser(User user);

    List<Follow> findAllByFollowedUser(User user);

    void deleteByFollowingUserAndFollowedUser(User followingUser, User followedUser);

}
