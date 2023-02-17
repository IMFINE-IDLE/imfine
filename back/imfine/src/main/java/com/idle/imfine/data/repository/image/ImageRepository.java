package com.idle.imfine.data.repository.image;

import com.idle.imfine.data.entity.image.Image;
import com.idle.imfine.data.entity.paper.Paper;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query("SELECT p.id FROM Image i join Paper p on i.paperId=p.id where p in :paperList")
    Set<Long> existsByPaperIds(@Param("paperList") List<Paper> paperList);

    @Query("select i from Image i join Paper p on p.id=i.paperId where p=:paper")
    List<Image> findByPaperId(@Param("paper") Paper paper);

    @Modifying
    @Query("delete from Image i where i.paperId=:paperId")
    List<Image> deleteByPaper(@Param("paperId")long paperId);

    @Modifying
    @Query("delete from Image i where i.id in :imageIds")
    void deleteByIdInJPQL(@Param("imageIds") List<Long> removeImages);
    @Query("Select i from Image i where i.id in :imageIds")
    List<Image> findByIdIn(@Param("imageIds") List<Long> putImages);
}
