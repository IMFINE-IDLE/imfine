package com.idle.imfine.service.symptom;

import com.idle.imfine.data.dto.symptom.response.ResponseSymptomViewDto;
import com.idle.imfine.data.dto.symptomCode.response.ResponseSymptomCodeDto;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SymptomService {

    List<ResponseSymptomViewDto> getSymptomList(@Param("id") int symptomCode);

    List<ResponseSymptomCodeDto> getSymptomCodeList();
}
