package com.superaipadel.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipment_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    
    private Integer quantity;
    
    private BigDecimal unitPrice;
    
    private BigDecimal totalAmount;
    
    private LocalDateTime transactionDate;
    
    private LocalDateTime returnDate;
    
    @Enumerated(EnumType.STRING)
    private TransactionStatus status;
    
    private String notes;
    
    @PrePersist
    protected void onCreate() {
        transactionDate = LocalDateTime.now();
        if (status == null) {
            status = TransactionStatus.COMPLETED;
        }
        if (totalAmount == null && unitPrice != null && quantity != null) {
            totalAmount = unitPrice.multiply(BigDecimal.valueOf(quantity));
        }
    }
    
    public enum TransactionType {
        PURCHASE,
        RENTAL
    }
    
    public enum TransactionStatus {
        PENDING,
        COMPLETED,
        RETURNED,
        CANCELLED
    }
}
