package com.idle.imfine.controller;

import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.medical.response.ResponseCategoryMedicalListDto;
import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.repository.medical.MedicalCodeRepository;
import com.idle.imfine.data.repository.medical.MedicalDepartmentCodeRepository;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/medical")
public class MedicalController {

    private final MedicalDepartmentCodeRepository medicalDepartmentCodeRepository;
    private final MedicalCodeRepository medicalCodeRepository;
    private final ResponseService responseService;
    @GetMapping("/list")
    public ResponseEntity<Result> getMedicalDepartmentList() {
        return ResponseEntity.ok().body(responseService.getListResult(medicalDepartmentCodeRepository.findAll().stream().map(
                medicalDepartmentCode -> ResponseCategoryMedicalListDto.builder()
                        .id(medicalDepartmentCode.getId())
                        .name(medicalDepartmentCode.getName())
                        .image(medicalDepartmentCode.getImage())
                        .build()
        ).collect(Collectors.toList())));
    }

    @GetMapping("/{medical-department-id}")
    public ResponseEntity<Result> getMedicalCodeList(
            @PathVariable("medical-department-id") int medicalDepartmentId) {
        return ResponseEntity.ok().body(responseService.getListResult(medicalCodeRepository.findByMedicalDepartmentCode_Id(medicalDepartmentId)
                .stream().map(
                        medicalCode -> ResponseCategoryMedicalListDto.builder()
                                .id(medicalCode.getId())
                                .name(medicalCode.getName())
                                .build()
                ).collect(Collectors.toList())));
    }
}
