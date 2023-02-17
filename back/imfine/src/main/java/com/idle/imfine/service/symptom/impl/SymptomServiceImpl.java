package com.idle.imfine.service.symptom.impl;

import com.idle.imfine.data.dto.symptom.response.ResponseSymptomViewDto;
import com.idle.imfine.data.dto.symptomCode.response.ResponseSymptomCodeDto;
import com.idle.imfine.data.repository.symptomCode.SymptomCodeRepository;
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.service.symptom.SymptomService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SymptomServiceImpl implements SymptomService {

    private final SymptomRepository symptomRepository;
    private final SymptomCodeRepository symptomCodeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ResponseSymptomViewDto> getSymptomList(int symptomCode) {
        return symptomRepository.findBySymptomCodeId(symptomCode).stream().map(
                symptom -> ResponseSymptomViewDto.builder()
                        .id(symptom.getId())
                        .name(symptom.getName())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResponseSymptomCodeDto> getSymptomCodeList() {
        return symptomCodeRepository.findAll().stream().map(
                symptomCode -> ResponseSymptomCodeDto.builder()
                        .id(symptomCode.getId())
                        .name(symptomCode.getName())
                        .image(symptomCode.getImage())
                        .build()
        ).collect(Collectors.toList());
    }
}
