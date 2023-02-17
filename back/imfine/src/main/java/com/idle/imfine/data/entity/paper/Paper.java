package com.idle.imfine.data.entity.paper;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.idle.imfine.data.entity.BaseCreatedEntity;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.image.Image;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKey;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Paper extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean open;

    @Column(nullable = false)
    private int commentCount;

    @Column(nullable = false)
    private int likeCount;

    @Column(nullable = false)
    private int declarationCount;

    @Column(nullable = false, columnDefinition = "integer default -1")
    private int sentiment;

    @OneToMany(mappedBy = "paper",fetch = FetchType.LAZY)
    private List<PaperHasSymptom> paperHasSymptoms;

    @OneToMany(mappedBy = "paperId",fetch = FetchType.LAZY)
    private List<Image> images;

    @OneToMany(mappedBy = "paperId",fetch = FetchType.LAZY)
    private List<Comment> comments;
    public void addLikeCount() {
        this.likeCount += 1;
    }

    public void delLikeCount() {
        this.likeCount -= 1;
    }

    public void declarationAdd() {
        this.declarationCount += 1;
    }
}
