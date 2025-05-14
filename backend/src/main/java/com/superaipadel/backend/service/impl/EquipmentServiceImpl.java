package com.superaipadel.backend.service.impl;

import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.repository.EquipmentRepository;
import com.superaipadel.backend.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    public Equipment findById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found with id: " + id));
    }

    @Override
    public List<Equipment> findAll() {
        return equipmentRepository.findAll();
    }

    @Override
    public List<Equipment> findByFacility(Facility facility) {
        return equipmentRepository.findByFacility(facility);
    }

    @Override
    public List<Equipment> findByFacilityAndType(Facility facility, Equipment.EquipmentType type) {
        return equipmentRepository.findByFacilityAndType(facility, type);
    }

    @Override
    public List<Equipment> findByFacilityAndAvailableForPurchase(Facility facility, boolean availableForPurchase) {
        return equipmentRepository.findByFacilityAndAvailableForPurchase(facility, availableForPurchase);
    }

    @Override
    public List<Equipment> findByFacilityAndAvailableForRental(Facility facility, boolean availableForRental) {
        return equipmentRepository.findByFacilityAndAvailableForRental(facility, availableForRental);
    }

    @Override
    public Equipment save(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    @Override
    public Equipment update(Long id, Equipment equipmentDetails) {
        Equipment equipment = findById(id);
        
        equipment.setName(equipmentDetails.getName());
        equipment.setDescription(equipmentDetails.getDescription());
        equipment.setImageUrl(equipmentDetails.getImageUrl());
        equipment.setType(equipmentDetails.getType());
        equipment.setPurchasePrice(equipmentDetails.getPurchasePrice());
        equipment.setRentalPrice(equipmentDetails.getRentalPrice());
        equipment.setAvailableForPurchase(equipmentDetails.getAvailableForPurchase());
        equipment.setAvailableForRental(equipmentDetails.getAvailableForRental());
        
        return equipmentRepository.save(equipment);
    }

    @Override
    public void deleteById(Long id) {
        equipmentRepository.deleteById(id);
    }

    @Override
    public void updateStock(Long id, Integer quantityChange) {
        Equipment equipment = findById(id);
        Integer newStock = equipment.getStockQuantity() + quantityChange;
        
        if (newStock < 0) {
            throw new RuntimeException("Cannot reduce stock below zero");
        }
        
        equipment.setStockQuantity(newStock);
        equipmentRepository.save(equipment);
    }
}
