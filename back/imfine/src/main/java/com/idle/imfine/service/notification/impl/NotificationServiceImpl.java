package com.idle.imfine.service.notification.impl;


import com.idle.imfine.data.dto.notification.request.RequestNotificationDetailDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotification;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;
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
import org.springframework.data.domain.Slice;
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
    private final Common common;

    @Override
    public List<ResponseNotification> showList(String uid, Pageable pageable) {
        User user = userRepository.getByUid(uid);

        List<ResponseNotification> responseNotificationList = new ArrayList<>();
        Slice<Notification> all = notificationRepository.findByRecieverId(user.getId(), pageable);

        for (Notification n : all) {
            User sender = userRepository.getById(n.getSenderId());
            User receiver = userRepository.getById(n.getRecieverId());
            String uId = sender.getUid();
            String userName = sender.getName();

            if (n.getContentsCodeId() == 6
                    && common.getFollowRelation(sender, receiver) == 2) { //type 6
                // common. 팔로우 관계 가져와서 > (메시지 보내는 사람, 받는사람)
                // 1: 팔로우 수락된건가야 > FALSE 수락 완료 표시
                // 2: 팔로우 관계가 아닌거니깐 > TRUE 수락 버튼 만들기
                ResponseNotification notification = ResponseNotification.builder()
                        .notificationId(n.getId())
                        .senderUid(uId)
                        .contentsCodeId(n.getContentsCodeId())
                        .contentsId(n.getContentsId())
                        .isCheck(n.isCheck())
                        .showButton(true)
                        .hasNext(all.hasNext())
                        .msg(makeMessage(userName, n.getType()))
                        .build();
                responseNotificationList.add(notification);
            } else {
                ResponseNotification notification = ResponseNotification.builder()
                        .notificationId(n.getId())
                        .senderUid(uId)
                        .contentsCodeId(n.getContentsCodeId())
                        .contentsId(n.getContentsId())
                        .isCheck(n.isCheck())
                        .showButton(false)
                        .hasNext(all.hasNext())
                        .msg(makeMessage(userName, n.getType()))
                        .build();
                responseNotificationList.add(notification);
            }
        }
        return responseNotificationList;
    }

    private String makeMessage(String senderId, int type) {
        String msg = "";

        if (type == 1) {
            msg += senderId + " 님이 당신의 일기장을 구독했습니다.";
        } else if (type == 2) {
            msg += senderId + " 님이 당신의 일기에 댓글을 달았습니다.";
        } else if (type == 31) {
            msg += senderId + " 님이 당신의 일기를 좋아합니다.";
        } else if (type == 33) {
            msg += senderId + " 님이 당신의 댓글을 좋아합니다.";
        } else if (type == 34) {
            msg += "누군가가 당신의 대나무를 좋아합니다.";
        } else if (type == 35) {
            msg += "누군가가 당신의 대나무 잎을 좋아합니다.";
        } else if (type == 4) {
            msg += "누군가가 당신의 대나무에 대나무 잎을 달았습니다.";
        } else if (type == 5) {
            msg += senderId + " 님이 당신을 팔로우 했습니다.";
        } else if (type == 6) {
            msg += senderId + " 님이 당신을 팔로우 하고 싶어합니다.";
        } else if (type == 7) {
            msg += senderId + " 님의 팔로우 요청을 수락했습니다.";
        } else if (type == 8) {
            msg += senderId + " 님의 팔로우 요청을 거절했습니다.";
        }
        return msg;
    }
    @Override
    public void checkNotification(RequestNotificationDetailDto requestNotificationDetailDto, String uid) {
        User user = userRepository.getByUid(uid);
        Notification notification = notificationRepository.getByIdAndRecieverId(
                requestNotificationDetailDto.getNotificationId(), user.getId());
        notification.setCheck(true);
    }
    public SseEmitter subscribe(String uid, String lastEventId) {
//        User user = userRepository.getByUid(uid);
        LOGGER.info("혹시 여기니2");
        String id = uid + "_" + System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        LOGGER.info("에미터 커플리션 {} {}", id, lastEventId);
        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        LOGGER.info("에미터 타임아웃 {} {}", id, lastEventId);
        emitter.onTimeout(() -> emitterRepository.deleteById(id));

        sendToClient(emitter, id, "EventStream Created. [userId=" + uid + "]");
        LOGGER.info("EventStream Created {}", id);

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
            exception.printStackTrace();
            emitterRepository.deleteById(id);
            throw new RuntimeException("연결 오류!");
        }
    }

    public void dtoToSend(ResponseNotificationPost responseDto) {
        Long senderId = responseDto.getSenderId();
        Long receiverId = responseDto.getReceiverId();
        if (!senderId.equals(receiverId)) {
            send(responseDto.getSenderId(), responseDto.getReceiverId(), responseDto.getContentsCodeId(),
                responseDto.getContentsId(), responseDto.getType());
        }
    }
    public void send(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId, int type) {
        //////
        User user = userRepository.getById(recieverId);
        LOGGER.info("에바다3");
        String id = String.valueOf(user.getUid());
        LOGGER.info("id {}", id);
        Notification notification = saveNotification(senderId, recieverId, contenstsCodeId, contentsId, type);

        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByMemberId(id);
        LOGGER.info("sseEmitter {}", sseEmitters.toString());
        sseEmitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, notification);
                    sendToClient(emitter, key, "알림이 왔습니다.");
                }
        );
        LOGGER.info("sseEmitter {}", sseEmitters.toString());
    }

    private Notification saveNotification(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId, int type) {
//        User user = userRepository.getByUid(uid);

        Notification notification = Notification.builder()
                .senderId(senderId)
                .recieverId(recieverId)
                .contentsCodeId(contenstsCodeId)
                .contentsId(contentsId)
                .type(type)
                .build();

        notificationRepository.save(notification);
        return notification;
    }

}
