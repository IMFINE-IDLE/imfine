package com.idle.imfine.data.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "writer_id")
    private User writer;

    @Column(nullable = false)
    private int medicalId;

    @Column(length = 20, nullable = false)
    private String title;

    @Column(length = 100)
    private String description;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private int paperCount;

    @Column(nullable = false)
    private int subscribeCount;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean open;

    @Column(nullable = false)
    private LocalDateTime startedDate;

    private LocalDateTime endedDate;
}
