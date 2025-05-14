package com.superaipadel.backend.repository;

import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByFacility(Facility facility);
    List<Equipment> findByFacilityAndType(Facility facility, Equipment.EquipmentType type);
    List<Equipment> findByFacilityAndAvailableForPurchase(Facility facility, boolean availableForPurchase);
    List<Equipment> findByFacilityAndAvailableForRental(Facility facility, boolean availableForRental);
}
