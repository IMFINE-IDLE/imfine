package com.idle.imfine.data.repository.medical;

import com.idle.imfine.data.entity.medical.MedicalCode;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalCodeRepository extends JpaRepository<MedicalCode, Integer> {
    List<MedicalCode> findByIdIn(List<Integer> medicalId);
}
