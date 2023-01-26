package com.idle.imfine.data.repository.bamboo;

import com.idle.imfine.data.entity.bamboo.Bamboo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BambooRepository extends JpaRepository<Bamboo, Integer> {
//    List<Bamboo> findBy
}
