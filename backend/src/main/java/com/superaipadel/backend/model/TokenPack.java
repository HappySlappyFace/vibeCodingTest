package com.superaipadel.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "token_packs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenPack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private String name;
    
    private String description;
    
    @NotNull
    @Min(1)
    private Integer tokenCount;
    
    @NotNull
    private BigDecimal price;
    
    private BigDecimal discount;
    
    private boolean active = true;
}
