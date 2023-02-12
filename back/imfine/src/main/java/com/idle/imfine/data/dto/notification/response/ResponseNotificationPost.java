package com.idle.imfine.data.dto.notification.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseNotificationPost {
    private Long senderId;
    private Long receiverId;
    private int contentsCodeId;
    private Long contentsId;
    private int type;
}
