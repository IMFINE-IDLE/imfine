package com.idle.imfine.data.dto.declaration.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
public class RequestDeclarationDto {

    private String senderId;
    private long type;
    private long contentsId;

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }
}
