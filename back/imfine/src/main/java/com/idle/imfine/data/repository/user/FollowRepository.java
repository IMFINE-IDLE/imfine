package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.Follow;
import com.idle.imfine.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    boolean existsByFollowingUserAndFollowedUser(User followingUser, User followedUser);

    Optional<Follow> findByFollowingUserAndFollowedUser(User followingUser, User followedUser);

    List<Follow> findAllByFollowingUser(User user);

    List<Follow> findAllByFollowedUser(User user);

    @Query("select f.followedUser from Follow f where f.followingUser = :followingUser")
    List<User> findAllFollowedUserByFollowingUser(@Param("followingUser") User user);

    @Query("select f.followingUser from Follow f where f.followedUser = :followedUser")
    List<User> findAllFollowingUserByFollowedUser(@Param("followedUser") User user);

    void deleteByFollowingUserAndFollowedUser(User followingUser, User followedUser);

    @Query("select count(f) from Follow f where f.followedUser = :followedUser")
    Long countFollowers(@Param("followedUser") User user);

    @Query("select count(f) from Follow f where f.followingUser = :followingUser")
    Long countFollowings(@Param("followingUser") User user);

}
