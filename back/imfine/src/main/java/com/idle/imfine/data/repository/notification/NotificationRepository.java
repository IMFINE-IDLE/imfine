package com.idle.imfine.data.repository.notification;

import com.idle.imfine.data.entity.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
