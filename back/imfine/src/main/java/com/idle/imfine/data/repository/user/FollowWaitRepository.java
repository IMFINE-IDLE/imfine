package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.FollowWait;
import com.idle.imfine.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowWaitRepository extends JpaRepository<FollowWait, Long> {

    boolean existsByRequesterAndReceiver(User requester, User receiver);
    List<FollowWait> findAllByReceiver(User receiver);
    void deleteByRequesterAndReceiver(User requester, User receiver);

}
