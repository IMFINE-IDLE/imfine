package com.idle.imfine.data.repository.symptomCode;

import com.idle.imfine.data.entity.symptom.Symptom;
import com.idle.imfine.data.entity.symptom.SymptomCode;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SymptomCodeRepository extends JpaRepository<SymptomCode, Integer> {
}
