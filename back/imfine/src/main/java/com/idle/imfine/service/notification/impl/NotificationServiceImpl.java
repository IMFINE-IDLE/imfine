package com.idle.imfine.service.notification.impl;


import com.idle.imfine.data.dto.notification.request.RequestNotificationDetailDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotification;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.notification.Notification;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.repository.comment.CommentRepository;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.emitter.EmitterRepository;
import com.idle.imfine.data.repository.notification.NotificationRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.exception.ConnectionException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.notification.NotificationService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.orm.jpa.EntityManagerFactoryUtils;
import org.springframework.orm.jpa.EntityManagerHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationServiceImpl.class);
    private static final Long DEFAULT_TIMEOUT = 60000L * 100;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final EmitterRepository emitterRepository;
    private final DiaryRepository diaryRepository;
    private final PaperRepository paperRepository;
    private final CommentRepository commentRepository;
    private final Common common;
    private final EntityManagerFactory entityManagerFactory;

    @Override
    @Transactional
    public List<ResponseNotification> showList(String uid, Pageable pageable) {
        User user = userRepository.getByUid(uid);

        List<ResponseNotification> responseNotificationList = new ArrayList<>();
        Slice<Notification> all = notificationRepository.findByRecieverIdOrderByCreatedAtDesc(user.getId(), pageable);

        for (Notification n : all) {
            Optional<User> sender = userRepository.findById(n.getSenderId());
            String uId = null;
            String userName = null;
            if (sender.isEmpty()) {
                continue;
            }
            uId = sender.get().getUid();
            userName = sender.get().getName();

            User receiver = userRepository.findById(n.getRecieverId()).get();

            String title = null;
            if (n.getContentsCodeId() == 1) {
                Optional<Diary> diary = diaryRepository.findById(n.getContentsId());
                if(diary.isPresent()) {
                    title = diary.get().getTitle();
                }
            } else if (n.getContentsCodeId() == 2) {
                Optional<Paper> paper = paperRepository.findById(n.getContentsId());
                if(paper.isPresent()) {
                    title = paper.get().getDiary().getTitle();
                }

            } else if (n.getContentsCodeId() == 3) {
                Optional<Comment> comment = commentRepository.findById(n.getContentsId());
                if(comment.isPresent()) {
                    long paperId = comment.get().getPaperId();

                    Optional<Paper> paper = paperRepository.findById(paperId);
                    if(paper.isPresent()) {
                        title = paper.get().getDiary().getTitle();
                    }
                }
            }

            if (n.getContentsCodeId() == 6
                    && common.getFollowRelation(sender.get(), receiver) == 2) {
                ResponseNotification notification = ResponseNotification.builder()
                        .notificationId(n.getId())
                        .senderUid(uId)
                        .contentsCodeId(n.getContentsCodeId())
                        .contentsId(n.getContentsId())
                        .title(title)
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
                        .title(title)
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
            msg += senderId + " ?????? ????????? ???????????? ??????????????????.";
        } else if (type == 2) {
            msg += senderId + " ?????? ????????? ????????? ????????? ???????????????.";
        } else if (type == 31) {
            msg += senderId + " ?????? ????????? ????????? ???????????????.";
        } else if (type == 33) {
            msg += senderId + " ?????? ????????? ????????? ???????????????.";
        } else if (type == 34) {
            msg += "???????????? ????????? ???????????? ???????????????.";
        } else if (type == 35) {
            msg += "???????????? ????????? ????????? ?????? ???????????????.";
        } else if (type == 4) {
            msg += "???????????? ????????? ???????????? ????????? ?????? ???????????????.";
        } else if (type == 5) {
            msg += senderId + " ?????? ????????? ????????? ????????????.";
        } else if (type == 6) {
            msg += senderId + " ?????? ????????? ????????? ?????? ???????????????.";
        } else if (type == 7) {
            msg += senderId + " ?????? ????????? ????????? ??????????????????.";
        } else if (type == 8) {
            msg += senderId + " ?????? ????????? ????????? ??????????????????.";
        }
        return msg;
    }
    @Override
    @Transactional
    public void checkNotification(RequestNotificationDetailDto requestNotificationDetailDto, String uid) {
        User user = userRepository.getByUid(uid);
        Notification notification = notificationRepository.getByIdAndRecieverId(
                requestNotificationDetailDto.getNotificationId(), user.getId());
        notification.setCheck(true);
        LOGGER.info("?????? ?????? ?????? service {}", notification.getId());
    }

    public SseEmitter subscribe(String uid, String lastEventId) {
        LOGGER.info("SseEmitter subscribe");
        String id = uid + "_" + System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        LOGGER.info("????????? ???????????? {} {}", id, lastEventId);
        emitter.onCompletion(() -> {
            EntityManagerHolder emHolder = (EntityManagerHolder) TransactionSynchronizationManager.unbindResource(entityManagerFactory);
            EntityManagerFactoryUtils.closeEntityManager(emHolder.getEntityManager());
            LOGGER.info("????????? ???????????? ??? {}", id);
            emitterRepository.deleteById(id);
        });
        LOGGER.info("????????? ???????????? {} {}", id, lastEventId);
        emitter.onTimeout(() -> {
            emitter.complete();
            LOGGER.info("????????? ???????????? {}", id);
            emitterRepository.deleteById(id);
        });

        sendToClient(emitter, id, "dummy", "EventStream Created. [userId=" + uid + "]");
        LOGGER.info("EventStream Created {}", id);

        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(uid));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> {
                        LOGGER.info("emitter key {}", entry.getKey());
                        sendToClient(emitter, entry.getKey(), "sse", entry.getValue());
                    });
        }
        return emitter;
    }

    private void sendToClient(SseEmitter emitter, String id, String name, Object data) {
        LOGGER.info("sendToClient!!");
        try {
            emitter.send(SseEmitter.event()
                    .id(id)
                    .name(name)
                    .data(data));
            LOGGER.info("sendToClient ??????");
        } catch (IOException exception) {
            emitterRepository.deleteById(id);
            emitter.complete();
            throw new ConnectionException("?????? ??????!");
        }
    }

    @Transactional(readOnly = true)
    public void send(long notificationId) {
        LOGGER.info("send event ?????????");
        Notification notification = notificationRepository.findById(notificationId).get();
        LOGGER.info("notification {}", notification.getRecieverId());
        User user = userRepository.findById(notification.getRecieverId()).get();
        String id = String.valueOf(user.getUid());

        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByMemberId(id);
        sseEmitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, notification);
                    sendToClient(emitter, key, "sse", "????????? ????????????.");
                }
        );
        LOGGER.info("sseEmitter {}", sseEmitters);
    }

    public void dtoToSend(ResponseNotificationPost responseDto) {
        LOGGER.info("dtoToSend service");
        Long senderId = responseDto.getSenderId();
        Long receiverId = responseDto.getReceiverId();

        if (!senderId.equals(receiverId)) {
            Notification notification = saveNotification(responseDto.getSenderId(), responseDto.getReceiverId(), responseDto.getContentsCodeId(),
                    responseDto.getContentsId(), responseDto.getType());
            send(notification.getId());
        }
    }

    @Transactional
    public Notification saveNotification(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId, int type) {
        LOGGER.info("?????? ?????? service");
        Notification notification = Notification.builder()
                .senderId(senderId)
                .recieverId(recieverId)
                .contentsCodeId(contenstsCodeId)
                .contentsId(contentsId)
                .type(type)
                .build();
        return notificationRepository.save(notification);
    }
}
