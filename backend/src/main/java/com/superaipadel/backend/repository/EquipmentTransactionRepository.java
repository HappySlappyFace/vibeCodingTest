package com.superaipadel.backend.repository;

import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.EquipmentTransaction;
import com.superaipadel.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EquipmentTransactionRepository extends JpaRepository<EquipmentTransaction, Long> {
    List<EquipmentTransaction> findByUser(User user);
    List<EquipmentTransaction> findByEquipment(Equipment equipment);
    List<EquipmentTransaction> findByUserAndType(User user, EquipmentTransaction.TransactionType type);
    List<EquipmentTransaction> findByUserAndStatus(User user, EquipmentTransaction.TransactionStatus status);
    
    @Query("SELECT et FROM EquipmentTransaction et WHERE et.equipment.facility.id = ?1")
    List<EquipmentTransaction> findByFacilityId(Long facilityId);
    
    @Query("SELECT et FROM EquipmentTransaction et WHERE et.transactionDate >= ?1 AND et.transactionDate <= ?2")
    List<EquipmentTransaction> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT et FROM EquipmentTransaction et WHERE et.type = 'RENTAL' AND et.status != 'RETURNED' AND et.user = ?1")
    List<EquipmentTransaction> findActiveRentalsByUser(User user);
}
