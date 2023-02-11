package com.idle.imfine.controller;

import com.idle.imfine.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@Slf4j
@RequiredArgsConstructor
public class SseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SseController.class);
    private final NotificationService notificationService;
    @GetMapping(consumes = MediaType.ALL_VALUE)
    public SseEmitter getNotification(@RequestParam String uid,
        @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        LOGGER.info("알람 리스트 api에 들어옴");
//        List<ResponseNotification> responseNotificationList = notificationService.showList(uid, pageable);
//        User user = userRepository.getByUid(uid);
        return notificationService.subscribe(uid, lastEventId);

    }
}
