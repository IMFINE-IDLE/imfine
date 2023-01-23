package com.idle.imfine.data.dto.bamboo.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseBamboo {
    private int bambooId;
    private String content;
    private LocalDateTime createdDate;
    private int likeCount;
    private int leafCount;

//    public ResponseBamboo(Bamboo entity) {
//        this.bambooId = entity.getBambooId();
//        this.content = entity.getContent();
//        this.createdDate = entity.getCreateDate();
//        this.likeCount = entity.getLikeCount();
//        this.leafCount = entity.getLeafCount();
//    }
}
