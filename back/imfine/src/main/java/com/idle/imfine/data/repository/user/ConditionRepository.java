package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.paper.Paper;
import java.util.Map;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConditionRepository extends JpaRepository<Condition, Long> {

    Optional<Condition> findByUserAndDate(User user, LocalDate date);

    List<Condition> findAllByUserInAndDate(List<User> userList, LocalDate date);

    List<Condition> findAllByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);

    boolean existsByUserAndDate(User user, LocalDate date);

    @Query("select new map (c.id as id, c.condition) from Condition c where c.date=:now and c.user.id in :commentUsers")
    Map<Long, Integer> findConditionsByDateAndUserIn(@Param("now") LocalDate now, @Param("commentUsers") List<Long> commentsUsers);

    @Query("select new map(p.id as id, c.condition as condition) from Paper p join Condition c on c.user=p.diary.writer where p.date=c.date and p in :papers")
    Map<Long, Integer> findPaperConditionByPapers(@Param("papers") List<Paper> papers);
    @Query("select c from Paper p join Condition c on c.user=p.diary.writer where p.date=c.date and p in :papers")
    List<Condition> findPaperConditionByPapersList(@Param("papers") List<Paper> papers);
}
