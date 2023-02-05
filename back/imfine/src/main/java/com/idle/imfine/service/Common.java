package com.idle.imfine.service;

import com.idle.imfine.config.security.JwtTokenProvider;
import com.idle.imfine.data.dto.notification.request.RequestNotificationDto;
import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.notification.Notification;
import com.idle.imfine.data.repository.notification.NotificationRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Common {

    private final UserRepository userRepository;
    private final ConditionRepository conditionRepository;
    private final FollowRepository followRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final NotificationRepository notificationRepository;

    public User getUserByUid(String uid) {
        return userRepository.findByUid(uid)
                .orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
    }

    public HttpHeaders createTokenHeaders(User user, String accessToken, String refreshToken) {
        String uid = user.getUid();
        List<String> role = user.getRoles();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", makeTokenCookie("access_token", accessToken, 60 * 60));
        headers.add("Set-Cookie", makeTokenCookie("refresh_token", refreshToken, 60 * 60 * 24 * 30));

        return headers;
    }

    public String makeTokenCookie(String name, String token, int maxAge) {
        Cookie cookie = new Cookie(name, "Bearer " + token);
        cookie.setMaxAge(maxAge);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie.toString();
    }

    public int getTodayUserCondition(User user) {
        Condition condition = conditionRepository.findByUserAndDate(user, LocalDate.now()).orElse(null);
        return condition != null ? condition.getCondition() : -1;
    }

    public int getFollowRelation(User user, User other) {
        if (user.getName().equals(other.getName())) {
            return 0;
        } else if (followRepository.existsByFollowingUserAndFollowedUser(user, other)) {
            return 1;
        }
        return 2;
    }

    public void increaseFollowingCount(User user) {
        int count = user.getFollowingCount();
        user.setFollowingCount(count + 1);
        userRepository.save(user);
    }

    public void decreaseFollowingCount(User user) {
        int count = user.getFollowingCount();
        user.setFollowingCount(count - 1);
        userRepository.save(user);
    }

    public void increaseFollwerCount(User user) {
        int count = user.getFollowerCount();
        user.setFollowerCount(count + 1);
        userRepository.save(user);
    }

    public void decreaseFollowerCount(User user) {
        int count = user.getFollowerCount();
        user.setFollowerCount(count - 1);
        userRepository.save(user);
    }

    public LocalDate convertDateType(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, formatter);
    }
    public String convertDateAllType(LocalDateTime date) {
        return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public void saveNotification(Long senderId, Long recieverId, int contenstsCodeId, Long contentsId) {
//        User user = userRepository.getByUid(uid);

        Notification notification = Notification.builder()
            .senderId(senderId)
            .recieverId(recieverId)
            .contentsCodeId(contenstsCodeId)
            .contentsId(contentsId)
            .build();

        notificationRepository.save(notification);
    }
}
