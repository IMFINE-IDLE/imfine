package com.idle.imfine.data.entity.leaf;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.idle.imfine.data.entity.BaseCreatedEntity;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "leaf")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Leaf extends BaseCreatedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length = 100)
    private String content;
    @Column
    private int likeCount;
    @Column
    private int declarationCount;

    @ManyToOne
    @JoinColumn(name="writer_id")
    User writer;

    @ManyToOne
    @JoinColumn(name = "bamboo_id")
    Bamboo bamboo;

    public void declarationAdd() {
        this.declarationCount += 1;
    }
}
