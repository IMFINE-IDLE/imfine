package com.idle.imfine.data.repository.symptom;


import com.idle.imfine.data.entity.symptom.Symptom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SymptomRepository extends JpaRepository<Symptom, Integer> {
    List<Symptom> findByIdIn(List<Integer> symptomIds);
    List<Symptom> findBySymptomCode(int symptomCode);
}
