package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.User;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User getByUid(String uid);

    User getByEmail(String email);

    Optional<User> findByUid(String uid);

    Optional<User> findByEmail(String email);

    Optional<User> findByUidAndEmail(String uid, String email);

    boolean existsByUid(String uid);
    boolean existsByName(String name);
    boolean existsByEmail(String email);
    Slice<User> findByNameContainingIgnoreCase(String query, Pageable pageable);

}