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
public class ResponseNotification {
    private long notificationId;
    private int contentsCodeId;
    //팔로우 경우 팔로우 아이디가 contentsId
    private long contentsId;
    private String senderUid;
    private boolean isCheck;
    private boolean showButton;
    private boolean hasNext;
    private String msg;
}
