package com.superaipadel.backend.controller;

import com.superaipadel.backend.dto.response.MessageResponse;
import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.service.EquipmentService;
import com.superaipadel.backend.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {
    
    @Autowired
    private EquipmentService equipmentService;
    
    @Autowired
    private FacilityService facilityService;
    
    @GetMapping("/facility/{facilityId}")
    public ResponseEntity<List<Equipment>> getEquipmentByFacility(@PathVariable Long facilityId) {
        Facility facility = facilityService.findById(facilityId);
        List<Equipment> equipment = equipmentService.findByFacility(facility);
        return ResponseEntity.ok(equipment);
    }
    
    @GetMapping("/facility/{facilityId}/purchase")
    public ResponseEntity<List<Equipment>> getEquipmentForPurchaseByFacility(@PathVariable Long facilityId) {
        Facility facility = facilityService.findById(facilityId);
        List<Equipment> equipment = equipmentService.findByFacilityAndAvailableForPurchase(facility, true);
        return ResponseEntity.ok(equipment);
    }
    
    @GetMapping("/facility/{facilityId}/rental")
    public ResponseEntity<List<Equipment>> getEquipmentForRentalByFacility(@PathVariable Long facilityId) {
        Facility facility = facilityService.findById(facilityId);
        List<Equipment> equipment = equipmentService.findByFacilityAndAvailableForRental(facility, true);
        return ResponseEntity.ok(equipment);
    }
    
    @GetMapping("/facility/{facilityId}/type/{type}")
    public ResponseEntity<List<Equipment>> getEquipmentByFacilityAndType(
            @PathVariable Long facilityId,
            @PathVariable Equipment.EquipmentType type) {
        Facility facility = facilityService.findById(facilityId);
        List<Equipment> equipment = equipmentService.findByFacilityAndType(facility, type);
        return ResponseEntity.ok(equipment);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
        Equipment equipment = equipmentService.findById(id);
        return ResponseEntity.ok(equipment);
    }
    
    @PostMapping("/facility/{facilityId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Equipment> createEquipment(@PathVariable Long facilityId, @RequestBody Equipment equipment) {
        Facility facility = facilityService.findById(facilityId);
        equipment.setFacility(facility);
        Equipment createdEquipment = equipmentService.save(equipment);
        return ResponseEntity.ok(createdEquipment);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipmentDetails) {
        Equipment updatedEquipment = equipmentService.update(id, equipmentDetails);
        return ResponseEntity.ok(updatedEquipment);
    }
    
    @PutMapping("/{id}/stock")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Equipment> updateEquipmentStock(
            @PathVariable Long id,
            @RequestParam Integer quantityChange) {
        
        equipmentService.updateStock(id, quantityChange);
        Equipment equipment = equipmentService.findById(id);
        return ResponseEntity.ok(equipment);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Equipment deleted successfully"));
    }
}
