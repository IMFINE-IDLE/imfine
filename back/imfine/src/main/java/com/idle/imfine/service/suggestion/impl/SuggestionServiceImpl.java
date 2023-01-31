package com.idle.imfine.service.suggestion.impl;

import com.idle.imfine.data.dto.suggestion.request.RequestSuggestionDto;
import com.idle.imfine.data.entity.Suggestion;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.suggestion.SuggestionRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.service.suggestion.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SuggestionServiceImpl implements SuggestionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SuggestionServiceImpl.class);
    private final UserRepository userRepository;
    private final SuggestionRepository suggestionRepository;

    public void save(RequestSuggestionDto requestSuggestionDto) {
        User user = userRepository.getByUid(requestSuggestionDto.getWriterId());

        Suggestion suggestion = Suggestion.builder()
                .content(requestSuggestionDto.getContent())
                .writerId(user.getId())
                .suggestionCategoryKey(requestSuggestionDto.getType())
                .build();

        LOGGER.info("건의 등록 {}", suggestion);
        suggestionRepository.save(suggestion);

    }
}
