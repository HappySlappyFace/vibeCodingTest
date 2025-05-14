package com.superaipadel.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "token_pack_id")
    private TokenPack tokenPack;
    
    private Integer tokensRemaining;
    
    private BigDecimal purchaseAmount;
    
    private LocalDateTime purchaseDate;
    
    private LocalDateTime expiryDate;
    
    @PrePersist
    protected void onCreate() {
        purchaseDate = LocalDateTime.now();
        tokensRemaining = tokenPack != null ? tokenPack.getTokenCount() : 0;
    }
}
