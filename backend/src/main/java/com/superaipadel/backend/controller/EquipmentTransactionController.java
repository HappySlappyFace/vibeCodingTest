package com.superaipadel.backend.controller;

import com.superaipadel.backend.dto.response.MessageResponse;
import com.superaipadel.backend.model.Equipment;
import com.superaipadel.backend.model.EquipmentTransaction;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.security.services.UserDetailsImpl;
import com.superaipadel.backend.service.EquipmentService;
import com.superaipadel.backend.service.EquipmentTransactionService;
import com.superaipadel.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/equipment-transactions")
public class EquipmentTransactionController {
    
    @Autowired
    private EquipmentTransactionService transactionService;
    
    @Autowired
    private EquipmentService equipmentService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/my-transactions")
    public ResponseEntity<List<EquipmentTransaction>> getMyTransactions(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        List<EquipmentTransaction> transactions = transactionService.findByUser(user);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/my-rentals")
    public ResponseEntity<List<EquipmentTransaction>> getMyActiveRentals(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        List<EquipmentTransaction> transactions = transactionService.findActiveRentalsByUser(user);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/facility/{facilityId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<EquipmentTransaction>> getTransactionsByFacility(@PathVariable Long facilityId) {
        List<EquipmentTransaction> transactions = transactionService.findByFacilityId(facilityId);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EquipmentTransaction> getTransactionById(@PathVariable Long id) {
        EquipmentTransaction transaction = transactionService.findById(id);
        return ResponseEntity.ok(transaction);
    }
    
    @PostMapping("/purchase/{equipmentId}")
    public ResponseEntity<EquipmentTransaction> purchaseEquipment(
            @PathVariable Long equipmentId,
            @RequestParam Integer quantity,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        User user = userService.findById(userDetails.getId());
        Equipment equipment = equipmentService.findById(equipmentId);
        
        EquipmentTransaction transaction = transactionService.purchaseEquipment(user, equipment, quantity);
        return ResponseEntity.ok(transaction);
    }
    
    @PostMapping("/rent/{equipmentId}")
    public ResponseEntity<EquipmentTransaction> rentEquipment(
            @PathVariable Long equipmentId,
            @RequestParam Integer quantity,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime returnDate,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        User user = userService.findById(userDetails.getId());
        Equipment equipment = equipmentService.findById(equipmentId);
        
        EquipmentTransaction transaction = transactionService.rentEquipment(user, equipment, quantity, returnDate);
        return ResponseEntity.ok(transaction);
    }
    
    @PutMapping("/{id}/return")
    public ResponseEntity<EquipmentTransaction> returnRentedEquipment(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        // Get transaction
        EquipmentTransaction transaction = transactionService.findById(id);
        
        // Ensure user is the owner of this transaction or is an admin
        if (!transaction.getUser().getId().equals(userDetails.getId()) && 
            !userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"))) {
            return ResponseEntity.badRequest().build();
        }
        
        EquipmentTransaction updatedTransaction = transactionService.returnRentedEquipment(id);
        return ResponseEntity.ok(updatedTransaction);
    }
    
    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<EquipmentTransaction> cancelTransaction(@PathVariable Long id) {
        EquipmentTransaction cancelledTransaction = transactionService.cancelTransaction(id);
        return ResponseEntity.ok(cancelledTransaction);
    }
}
