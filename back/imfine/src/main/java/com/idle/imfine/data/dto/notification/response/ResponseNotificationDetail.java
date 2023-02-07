package com.idle.imfine.data.dto.notification.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseNotificationDetail {
    private int contentsCodeId;
    private long contentsId;
    private String senderId;
}
