package com.idle.imfine.controller;

import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.symptom.response.ResponseSymptomViewDto;
import com.idle.imfine.service.symptom.SymptomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/symptom")
public class SymptomController {

    private final SymptomService symptomService;
    private final ResponseService responseService;

    private static final Logger LOGGER = LoggerFactory.getLogger(SymptomController.class);

    @GetMapping("/{symptom-code}")
    public ResponseEntity<Result> getSymptomList(@PathVariable("symptom-code") int symptomCode) {
        List<ResponseSymptomViewDto> responseDto = symptomService.getSymptomList(symptomCode);
        LOGGER.info("증상 목록 반환");
        return ResponseEntity.ok().body(responseService.getListResult(responseDto));
    }

    @GetMapping("/symptom-codes")
    public ResponseEntity<Result> getSymptomCodeList() {
        LOGGER.info("증상 코드 조회");
        return ResponseEntity.ok().body(responseService.getListResult(
                symptomService.getSymptomCodeList()
        ));
    }
}
