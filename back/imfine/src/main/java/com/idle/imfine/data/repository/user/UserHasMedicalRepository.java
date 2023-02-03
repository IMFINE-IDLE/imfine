package com.idle.imfine.data.repository.user;

import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.UserHasMedical;
import com.idle.imfine.data.entity.medical.MedicalCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserHasMedicalRepository extends JpaRepository<UserHasMedical, Long> {

    List<UserHasMedical> findAllByUser(User user);

    Optional<MedicalCode> findByUserAndMedicalCode(User user, MedicalCode medicalCode);

    void deleteByUserAndMedicalCode(User user, MedicalCode medicalCode);

    void deleteAllByUser(User user);

}
