package com.superaipadel.backend.service;

import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.EquipmentTransaction;
import com.superaipadel.backend.model.User;

import java.time.LocalDateTime;
import java.util.List;

public interface EquipmentTransactionService {
    EquipmentTransaction findById(Long id);
    List<EquipmentTransaction> findAll();
    List<EquipmentTransaction> findByUser(User user);
    List<EquipmentTransaction> findByEquipment(Equipment equipment);
    List<EquipmentTransaction> findByUserAndType(User user, EquipmentTransaction.TransactionType type);
    List<EquipmentTransaction> findByUserAndStatus(User user, EquipmentTransaction.TransactionStatus status);
    List<EquipmentTransaction> findByFacilityId(Long facilityId);
    List<EquipmentTransaction> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    List<EquipmentTransaction> findActiveRentalsByUser(User user);
    EquipmentTransaction save(EquipmentTransaction transaction);
    EquipmentTransaction purchaseEquipment(User user, Equipment equipment, Integer quantity);
    EquipmentTransaction rentEquipment(User user, Equipment equipment, Integer quantity, LocalDateTime returnDate);
    EquipmentTransaction returnRentedEquipment(Long transactionId);
    EquipmentTransaction cancelTransaction(Long id);
}
