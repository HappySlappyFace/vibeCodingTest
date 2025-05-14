package com.superaipadel.backend.service;

import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.Facility;

import java.util.List;

public interface EquipmentService {
    Equipment findById(Long id);
    List<Equipment> findAll();
    List<Equipment> findByFacility(Facility facility);
    List<Equipment> findByFacilityAndType(Facility facility, Equipment.EquipmentType type);
    List<Equipment> findByFacilityAndAvailableForPurchase(Facility facility, boolean availableForPurchase);
    List<Equipment> findByFacilityAndAvailableForRental(Facility facility, boolean availableForRental);
    Equipment save(Equipment equipment);
    Equipment update(Long id, Equipment equipmentDetails);
    void deleteById(Long id);
    void updateStock(Long id, Integer quantityChange);
}
