package com.idle.imfine.service;

import com.idle.imfine.config.security.JwtTokenProvider;
import com.idle.imfine.data.dto.user.response.TokenResponseDto;
import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.notification.Notification;
import com.idle.imfine.data.repository.notification.NotificationRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.data.repository.user.FollowRepository;
import com.idle.imfine.data.repository.user.FollowWaitRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.UserErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Common {

    private final UserRepository userRepository;
    private final ConditionRepository conditionRepository;
    private final FollowRepository followRepository;
    private final FollowWaitRepository followWaitRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final NotificationRepository notificationRepository;

    public User getUserByUid(String uid) {
        return userRepository.findByUid(uid)
                .orElseThrow(() -> new ErrorException(UserErrorCode.USER_NOT_FOUND));
    }

    public Map<String, Object> createTokenResult(String accessToken, String refreshToken) {
        Map<String, Object> result = new HashMap<>();

        HttpHeaders headers = createTokenHeader(accessToken, refreshToken);

        TokenResponseDto body = TokenResponseDto.builder()
                .accessToken("Bearer " + accessToken)
                .build();

        result.put("headers", headers);
        result.put("body", body);

        return result;
    }

    public HttpHeaders createTokenHeader(String accessToken, String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", createTokenCookie("accessToken", accessToken, 60 * 60 * 24 * 7));
        headers.add("Set-Cookie", createTokenCookie("refreshToken", refreshToken, 60 * 60 * 24 * 7));
        return headers;
    }

    public HttpHeaders deleteTokenHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", createTokenCookie("accessToken", "", 0));
        headers.add("Set-Cookie", createTokenCookie("refreshToken", "", 0));
        return headers;
    }

    public String createTokenCookie(String name, String token, int maxAge) {
        ResponseCookie cookie = ResponseCookie.from(name, "Bearer%" + token)
                .path("/")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .maxAge(maxAge)
                .build();
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
        } else if (followWaitRepository.existsByRequesterAndReceiver(user, other)) {
            return 2;
        }
        return 3;
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
