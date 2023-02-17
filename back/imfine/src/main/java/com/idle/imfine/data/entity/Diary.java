package com.idle.imfine.data.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.idle.imfine.data.entity.medical.MedicalCode;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.symptom.DiaryHasSymptom;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Diary extends BaseCreatedEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private User writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_id")
    private MedicalCode medicalCode;

    @Column(length = 20, nullable = false)
    private String title;

    @Column(length = 100)
    private String description;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean active;

    @Column(nullable = false)
    private int paperCount;

    @Column(nullable = false)
    private int subscribeCount;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean open;

    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime postedAt;

    private LocalDateTime endedAt;

    @Column(nullable = false)
    private int declarationCount;

    @OneToMany(mappedBy = "diary", fetch = FetchType.LAZY)
    private List<Paper> papers;

    @OneToMany(mappedBy = "diary", fetch = FetchType.LAZY)
    private List<DiaryHasSymptom> diaryHasSymptoms;
}
