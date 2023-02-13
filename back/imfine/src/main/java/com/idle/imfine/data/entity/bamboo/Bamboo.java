package com.idle.imfine.data.entity.bamboo;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.idle.imfine.data.entity.BaseCreatedEntity;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.leaf.Leaf;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Bamboo extends BaseCreatedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length = 300)
    private String content;
    @Column(nullable = false)
    private int likeCount;
    @Column(nullable = false)
    private int declarationCount;
    @Column(nullable = false)
    private int leafCount;
    @Column(nullable = false)
    private LocalDateTime deleteAt;
    @ManyToOne
    @JoinColumn(name="writer_id")
    private User writer;
    @OneToMany(mappedBy = "bamboo", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Leaf> leaves;

    public void declarationAdd() {
        this.declarationCount += 1;
    }
}
