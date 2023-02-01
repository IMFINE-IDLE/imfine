package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.declaration.request.RequestDeclarationDto;
import com.idle.imfine.service.declaration.DeclarationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class DeclarationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeclarationController.class);
    private final DeclarationService declarationService;
    private final ResponseService responseService;

    @PostMapping("/diary")
    public ResponseEntity<Result> postDiaryReport(@RequestBody RequestDeclarationDto requestDeclaration, @LoginUser String uid) {
        requestDeclaration.setSenderId(uid);
        declarationService.saveDiaryReport(requestDeclaration);

        LOGGER.info("건의 동록 api에 들어옴 {}", requestDeclaration);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/paper")
    public ResponseEntity<Result> postPaperReport(@RequestBody RequestDeclarationDto requestDeclaration, @LoginUser String uid) {
        requestDeclaration.setSenderId(uid);
        declarationService.savePaperReport(requestDeclaration);

        LOGGER.info("건의 동록 api에 들어옴 {}", requestDeclaration);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/comment")
    public ResponseEntity<Result> postCommentReport(@RequestBody RequestDeclarationDto requestDeclaration, @LoginUser String uid) {
        requestDeclaration.setSenderId(uid);
        declarationService.saveCommentReport(requestDeclaration);

        LOGGER.info("건의 동록 api에 들어옴 {}", requestDeclaration);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/bamboo")
    public ResponseEntity<Result> postBambooReport(@RequestBody RequestDeclarationDto requestDeclaration, @LoginUser String uid) {
        requestDeclaration.setSenderId(uid);
        declarationService.saveBambooReport(requestDeclaration);

        LOGGER.info("건의 동록 api에 들어옴 {}", requestDeclaration);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

    @PostMapping("/leaf")
    public ResponseEntity<Result> postLeafReport(@RequestBody RequestDeclarationDto requestDeclaration, @LoginUser String uid) {
        requestDeclaration.setSenderId(uid);
        declarationService.saveLeafReport(requestDeclaration);

        LOGGER.info("건의 동록 api에 들어옴 {}", requestDeclaration);
        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }

}
