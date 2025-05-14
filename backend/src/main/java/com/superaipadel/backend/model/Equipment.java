package com.superaipadel.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String name;
    
    private String description;
    
    private String imageUrl;
    
    @Enumerated(EnumType.STRING)
    private EquipmentType type;
    
    @NotNull
    private BigDecimal purchasePrice;
    
    private BigDecimal rentalPrice;
    
    @Min(0)
    private Integer stockQuantity;
    
    private Boolean availableForPurchase = true;
    
    private Boolean availableForRental = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id")
    private Facility facility;
    
    public enum EquipmentType {
        RACKET,
        BALL,
        APPAREL,
        ACCESSORY,
        FOOD,
        DRINK,
        OTHER
    }
}
