package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.paper.Paper;
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

    boolean existsByUid(String uid);
    boolean existsByName(String name);
    boolean existsByEmail(String email);
    boolean existsByUidAndEmail(String uid, String email);

    Slice<User> findByNameContainingIgnoreCase(String query, Pageable pageable);
    @Query("select p from Paper p where p.diary in :diaries")
    List<Paper> findPapersByDiaries(@Param("diaries") List<Diary> diaries);

    @Modifying
    @Query("delete from Leaf l where l.writer = :writer")
    void deleteLeavesByWriter(@Param("writer") User writer);

    @Modifying
    @Query("delete from Bamboo b where b.writer = :writer")
    void deleteBamboosByWriter(@Param("writer") User writer);

    @Query("select b from Bamboo b where b.writer=:writer")
    List<Bamboo> findByBamboo(@Param("writer") User writer);
}