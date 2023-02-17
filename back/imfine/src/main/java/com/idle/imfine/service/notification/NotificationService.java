package com.idle.imfine.service.notification;

import com.idle.imfine.data.dto.notification.request.RequestNotificationDetailDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotification;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;
import com.idle.imfine.data.entity.notification.Notification;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {

    List<ResponseNotification> showList(String uid, Pageable pageable);
    void checkNotification(RequestNotificationDetailDto requestNotificationDetailDto, String uid);
    SseEmitter subscribe(String uid, String lastEventId);
    void dtoToSend(ResponseNotificationPost responseDto);
    void send(long notificationId);
    Notification saveNotification(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId, int type);

}
