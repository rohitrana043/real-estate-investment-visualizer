package dev.rohitrana.propertymap.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private String city;
    private String state;
    private String zipCode;

    private Integer bedrooms;
    private Integer bathrooms;
    private Integer squareFeet;
    private Integer yearBuilt;

    private BigDecimal listPrice;
    private String status; // Active, Pending, Sold

    // Location coordinates
    private Double latitude;
    private Double longitude;

    // Investment metrics
    private BigDecimal capRate;
    private BigDecimal appreciationRate;
    private BigDecimal cashOnCashReturn;
    private BigDecimal monthlyRent;
    private BigDecimal yearlyExpenses;

    private String imageUrl;
    private String description;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
