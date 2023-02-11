package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.declaration.request.RequestDeclarationDto;
import com.idle.imfine.data.dto.notification.request.RequestNotificationDetailDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotification;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.service.notification.NotificationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/notification")
@Slf4j
@RequiredArgsConstructor
public class NotificationController {
    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationController.class);
    private final ResponseService responseService;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Result> postNotification(@RequestBody RequestDeclarationDto requestDeclaration, @LoginUser String uid) {


        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @GetMapping("/list")
    public ResponseEntity<Result> getNotificationList(@LoginUser String uid, Pageable pageable) {
        LOGGER.info("알람 리스트 api에 들어옴");
        List<ResponseNotification> responseNotificationList = notificationService.showList(uid, pageable);

        return ResponseEntity.ok()
                .body(responseService.getListResult(responseNotificationList));

    }
/*
    @GetMapping(value = "/subscribe", consumes = MediaType.ALL_VALUE)
    public SseEmitter getNotification(@RequestParam String uid,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        LOGGER.info("알람 리스트 api에 들어옴");
//        List<ResponseNotification> responseNotificationList = notificationService.showList(uid, pageable);
//        User user = userRepository.getByUid(uid);
        return notificationService.subscribe(uid, lastEventId);

    }*/

    @PostMapping("/check")
    public ResponseEntity<Result> getNotificationCheck(@RequestBody RequestNotificationDetailDto requestNotificationDetail,
            @LoginUser String uid) {
        LOGGER.info("알림 확인 api 들어옴");
        notificationService.checkNotification(requestNotificationDetail, uid);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
}
