package com.idle.imfine.service.notification.impl;


import com.idle.imfine.data.dto.notification.response.ResponseNotification;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationDetail;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.notification.Notification;
import com.idle.imfine.data.repository.emitter.EmitterRepository;
import com.idle.imfine.data.repository.notification.NotificationRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.notification.NotificationService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Transactional
@Service
public class NotificationServiceImpl implements NotificationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationServiceImpl.class);
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final EmitterRepository emitterRepository;

    @Override
    public List<ResponseNotification> showList(String uid, Pageable pageable) {
        User user = userRepository.getByUid(uid);

        List<ResponseNotification> responseNotificationList = new ArrayList<>();
        Page<Notification> all = notificationRepository.findByRecieverId(user.getId(), pageable);
        boolean isOpen = user.isOpen();

        for (Notification n : all) {
            String userId = userRepository.getById(n.getId()).getUid();
            if (n.getContentsCodeId() == 6 && !isOpen) {
                ResponseNotification notification = ResponseNotification.builder()
                        .notificationId(n.getId())
                        .senderUid(userId)
                        .contentsCodeId(n.getContentsCodeId())
                        .contentsId(n.getContentsId())
                        .isCheck(n.isCheck())
                        .showButton(true)
                        .build();
                responseNotificationList.add(notification);
            } else {
                ResponseNotification notification = ResponseNotification.builder()
                        .notificationId(n.getId())
                        .senderUid(userId)
                        .contentsCodeId(n.getContentsCodeId())
                        .contentsId(n.getContentsId())
                        .isCheck(n.isCheck())
                        .showButton(false)
                        .build();
                responseNotificationList.add(notification);
            }
        }
        return responseNotificationList;
    }

    @Override
    public ResponseNotificationDetail showNotification(long notificationId) {
        Notification notification = notificationRepository.getById(notificationId);
        String senderId = userRepository.getById(notification.getSenderId()).getUid();
        ResponseNotificationDetail responseNotificationDetail = ResponseNotificationDetail.builder()
                .contentsCodeId(notification.getContentsCodeId())
                .contentsId(notification.getContentsId())
                .senderId(senderId)
                .build();

        return responseNotificationDetail;
    }
    public SseEmitter subscribe(String uid, String lastEventId) {
//        User user = userRepository.getByUid(uid);
        LOGGER.info("혹시 여기니2");
        String id = uid + "_" + System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        emitter.onTimeout(() -> emitterRepository.deleteById(id));

        sendToClient(emitter, id, "EventStream Created. [userId=" + uid + "]");

        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(uid));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }

        return emitter;
    }

    private void sendToClient(SseEmitter emitter, String id, Object data) {
        LOGGER.info("여긴가1");
        try {
            emitter.send(SseEmitter.event()
                    .id(id)
                    .name("sse")
                    .data(data));
            LOGGER.info("sendToClient 들어오니ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ");
        } catch (IOException exception) {
            LOGGER.info("여기는 오니");
            emitterRepository.deleteById(id);
            throw new RuntimeException("연결 오류!");
        }
    }

    public void send(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId) {
//        User user = userRepository.getByUid(uid);
        LOGGER.info("에바다3");
        String id = String.valueOf(recieverId);
        Notification notification = saveNotification(senderId, recieverId, contenstsCodeId, contentsId);

        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByMemberId(id);
        sseEmitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, notification);
                    sendToClient(emitter, key, "알림이 왔습니다.");
                }
        );
    }

    private Notification saveNotification(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId) {
//        User user = userRepository.getByUid(uid);

        Notification notification = Notification.builder()
                .senderId(senderId)
                .recieverId(recieverId)
                .contentsCodeId(contenstsCodeId)
                .contentsId(contentsId)
                .build();

        notificationRepository.save(notification);
        return notification;
    }

//    public void notifyAddEvent(Long receiverId) {
//        if (sseEmitters.containsKey(receiverId)) {
//            SseEmitter sseEmitter = sseEmitters.get(receiverId);
//            try {
//                sseEmitter.send(SseEmitter.event().name("addComment").data("댓글이 달렸습니다!!!!!"));
//            } catch (Exception e) {
//                sseEmitters.remove(receiverId);
//            }
//        }
//    }
}
