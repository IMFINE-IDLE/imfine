package com.idle.imfine.service.notification;

import com.idle.imfine.data.dto.declaration.request.RequestDeclarationDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotification;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationDetail;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {

    //    void save(RequestDeclarationDto requestDeclaration, String uid);
    List<ResponseNotification> showList(String uid, Pageable pageable);
    ResponseNotificationDetail showNotification(long notificationId);
    SseEmitter subscribe(String uid, String lastEventId);
    void send(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId, int type);

}
