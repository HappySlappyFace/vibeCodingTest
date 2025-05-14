package com.superaipadel.backend.service.impl;

import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.EquipmentTransaction;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.repository.EquipmentTransactionRepository;
import com.superaipadel.backend.service.EquipmentService;
import com.superaipadel.backend.service.EquipmentTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EquipmentTransactionServiceImpl implements EquipmentTransactionService {

    @Autowired
    private EquipmentTransactionRepository transactionRepository;
    
    @Autowired
    private EquipmentService equipmentService;

    @Override
    public EquipmentTransaction findById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment transaction not found with id: " + id));
    }

    @Override
    public List<EquipmentTransaction> findAll() {
        return transactionRepository.findAll();
    }

    @Override
    public List<EquipmentTransaction> findByUser(User user) {
        return transactionRepository.findByUser(user);
    }

    @Override
    public List<EquipmentTransaction> findByEquipment(Equipment equipment) {
        return transactionRepository.findByEquipment(equipment);
    }

    @Override
    public List<EquipmentTransaction> findByUserAndType(User user, EquipmentTransaction.TransactionType type) {
        return transactionRepository.findByUserAndType(user, type);
    }

    @Override
    public List<EquipmentTransaction> findByUserAndStatus(User user, EquipmentTransaction.TransactionStatus status) {
        return transactionRepository.findByUserAndStatus(user, status);
    }

    @Override
    public List<EquipmentTransaction> findByFacilityId(Long facilityId) {
        return transactionRepository.findByFacilityId(facilityId);
    }

    @Override
    public List<EquipmentTransaction> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return transactionRepository.findByDateRange(startDate, endDate);
    }

    @Override
    public List<EquipmentTransaction> findActiveRentalsByUser(User user) {
        return transactionRepository.findActiveRentalsByUser(user);
    }

    @Override
    public EquipmentTransaction save(EquipmentTransaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public EquipmentTransaction purchaseEquipment(User user, Equipment equipment, Integer quantity) {
        // Check if equipment is available for purchase
        if (!equipment.getAvailableForPurchase()) {
            throw new RuntimeException("Equipment is not available for purchase");
        }
        
        // Check if enough stock is available
        if (equipment.getStockQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }
        
        // Create transaction
        EquipmentTransaction transaction = new EquipmentTransaction();
        transaction.setEquipment(equipment);
        transaction.setUser(user);
        transaction.setType(EquipmentTransaction.TransactionType.PURCHASE);
        transaction.setQuantity(quantity);
        transaction.setUnitPrice(equipment.getPurchasePrice());
        transaction.setTotalAmount(equipment.getPurchasePrice().multiply(BigDecimal.valueOf(quantity)));
        transaction.setStatus(EquipmentTransaction.TransactionStatus.COMPLETED);
        transaction.setTransactionDate(LocalDateTime.now());
        
        // Update equipment stock
        equipmentService.updateStock(equipment.getId(), -quantity);
        
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public EquipmentTransaction rentEquipment(User user, Equipment equipment, Integer quantity, LocalDateTime returnDate) {
        // Check if equipment is available for rental
        if (!equipment.getAvailableForRental()) {
            throw new RuntimeException("Equipment is not available for rental");
        }
        
        // Check if enough stock is available
        if (equipment.getStockQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }
        
        // Create transaction
        EquipmentTransaction transaction = new EquipmentTransaction();
        transaction.setEquipment(equipment);
        transaction.setUser(user);
        transaction.setType(EquipmentTransaction.TransactionType.RENTAL);
        transaction.setQuantity(quantity);
        transaction.setUnitPrice(equipment.getRentalPrice());
        transaction.setTotalAmount(equipment.getRentalPrice().multiply(BigDecimal.valueOf(quantity)));
        transaction.setStatus(EquipmentTransaction.TransactionStatus.PENDING);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setReturnDate(returnDate);
        
        // Update equipment stock
        equipmentService.updateStock(equipment.getId(), -quantity);
        
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public EquipmentTransaction returnRentedEquipment(Long transactionId) {
        EquipmentTransaction transaction = findById(transactionId);
        
        // Verify this is a rental transaction
        if (transaction.getType() != EquipmentTransaction.TransactionType.RENTAL) {
            throw new RuntimeException("This is not a rental transaction");
        }
        
        // Verify the transaction is not already returned or cancelled
        if (transaction.getStatus() == EquipmentTransaction.TransactionStatus.RETURNED || 
            transaction.getStatus() == EquipmentTransaction.TransactionStatus.CANCELLED) {
            throw new RuntimeException("This transaction has already been processed");
        }
        
        // Update transaction status
        transaction.setStatus(EquipmentTransaction.TransactionStatus.RETURNED);
        
        // Return items to inventory
        equipmentService.updateStock(transaction.getEquipment().getId(), transaction.getQuantity());
        
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public EquipmentTransaction cancelTransaction(Long id) {
        EquipmentTransaction transaction = findById(id);
        
        // Verify the transaction is not already completed, returned or cancelled
        if (transaction.getStatus() == EquipmentTransaction.TransactionStatus.COMPLETED || 
            transaction.getStatus() == EquipmentTransaction.TransactionStatus.RETURNED || 
            transaction.getStatus() == EquipmentTransaction.TransactionStatus.CANCELLED) {
            throw new RuntimeException("This transaction cannot be cancelled");
        }
        
        // Update transaction status
        transaction.setStatus(EquipmentTransaction.TransactionStatus.CANCELLED);
        
        // Return items to inventory
        equipmentService.updateStock(transaction.getEquipment().getId(), transaction.getQuantity());
        
        return transactionRepository.save(transaction);
    }
}
