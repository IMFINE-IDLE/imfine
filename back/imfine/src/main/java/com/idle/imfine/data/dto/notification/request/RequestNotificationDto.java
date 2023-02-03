package com.idle.imfine.data.dto.notification.request;

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
public class RequestNotificationDto {
    private String senderId;
    private long contentsId;

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }
}
