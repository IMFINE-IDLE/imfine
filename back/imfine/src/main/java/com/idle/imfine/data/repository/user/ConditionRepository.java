package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ConditionRepository extends JpaRepository<Condition, Long> {

    Optional<Condition> findByUserAndDate(User user, LocalDate date);

    List<Condition> findAllByUserInAndDate(List<User> userList, LocalDate date);

    List<Condition> findAllByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);

    boolean existsByUserAndDate(User user, LocalDate date);

}
