package com.idle.imfine.data.repository;

import com.idle.imfine.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User getByUid(String uid);

}