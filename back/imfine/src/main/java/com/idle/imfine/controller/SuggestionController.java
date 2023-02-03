package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.suggestion.request.RequestSuggestionDto;
import com.idle.imfine.service.suggestion.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/suggestion")
@RequiredArgsConstructor
public class SuggestionController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SuggestionController.class);
    private final SuggestionService suggestionService;
    private final ResponseService responseService;

    @PostMapping
    public ResponseEntity<Result> postSuggestion(@RequestBody RequestSuggestionDto requestSuggestion, @LoginUser String uid) {
        requestSuggestion.setWriterId(uid);
        suggestionService.save(requestSuggestion);
        LOGGER.info("건의 동록 api에 들어옴 {}", requestSuggestion);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
}
