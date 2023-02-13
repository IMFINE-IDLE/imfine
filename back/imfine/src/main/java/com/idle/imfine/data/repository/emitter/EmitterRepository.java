package com.idle.imfine.data.repository.emitter;

import java.util.Map;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter);
    void saveEventCache(String emitterId, Object event);
    Map<String, SseEmitter> findAllEmitterStartWithByMemberId(String uid);
    Map<String, Object> findAllEventCacheStartWithByMemberId(String uid);
    void deleteById(String id);
    void deleteAllEmitterStartWithId(String uid);
    void deleteAllEventCacheStartWithId(String uid);
}
