package com.idle.imfine.data.dto.bamboo.response;

import com.idle.imfine.data.dto.leaf.response.ResponseLeafDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseBambooDetailDto {
    private Long bambooId;
    private String content;
    private LocalDateTime createdDate;
    private int likeCount;
    private int leafCount;
    private List<ResponseLeafDto> leaf;
//    public ResponseBambooDetail setLeaf(List<ResponseLeaf> leaf) {
//        this.leaf = leaf;
//        return this;
//    }

//    public ResponseBambooDetail() {
//    }
}
