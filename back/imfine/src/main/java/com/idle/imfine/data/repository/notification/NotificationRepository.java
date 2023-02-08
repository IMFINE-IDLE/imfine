package com.idle.imfine.data.repository.notification;

import com.idle.imfine.data.entity.notification.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Page<Notification> findByRecieverId(Long receiverId, Pageable pageable);
    Notification getByRecieverIdAndSenderIdAndContentsCodeId(Long receiverId, Long senderId, int contentsCodeId);
}
