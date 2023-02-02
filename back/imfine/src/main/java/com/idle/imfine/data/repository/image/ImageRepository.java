package com.idle.imfine.data.repository.image;

import com.idle.imfine.data.entity.image.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
