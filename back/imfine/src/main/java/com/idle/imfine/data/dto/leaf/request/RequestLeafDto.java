package com.idle.imfine.data.dto.leaf.request;


import com.idle.imfine.data.entity.leaf.Leaf;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestLeafDto {
    private String writerId;
    private int bambooId;
    private String content;

    @Builder
    public RequestLeafDto(int bambooId, String content) {
        this.bambooId = bambooId;
        this.content = content;
    }
    public void setWriterId(String writerId){
        this.writerId = writerId;
    }

}
