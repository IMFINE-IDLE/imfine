package com.idle.imfine.data.dto.leaf.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class RequestLeafDto {
    private int writerId;
    private int bambooId;
    private String content;

    public RequestLeafDto(){}
    public RequestLeafDto(int bambooId, String content) {
        this.bambooId = bambooId;
        this.content = content;
    }
    public void setWriterId(int writerId){
        this.writerId = writerId;
    }
}
