package com.superaipadel.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "terrains")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Terrain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String name;

    @Size(max = 500)
    private String description;
    
    private String imageUrl;
    
    @Column(nullable = false)
    private BigDecimal pricePerHour;
    
    private boolean indoor;
    
    @Enumerated(EnumType.STRING)
    private TerrainType type;
    
    private boolean active = true;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id")
    private Facility facility;
    
    @OneToMany(mappedBy = "terrain", cascade = CascadeType.ALL)
    private Set<Reservation> reservations = new HashSet<>();
    
    public enum TerrainType {
        SINGLE,
        DOUBLE,
        PANORAMIC
    }
}
