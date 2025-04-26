package dev.rohitrana.propertymap.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "location_scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double latitude;
    private Double longitude;
    private String address;

    // Score components (0-10 scale)
    private Integer overallScore;
    private Integer performanceScore;
    private Integer riskScore;
    private Integer demandScore;
    private Integer supplyScore;

    // Performance metrics
    private Double capRate;
    private Double appreciation;
    private Double irr; // Internal Rate of Return
    private Double fiveYearTotalReturn;
    private Double averageHousePrice;
    private Double propertyTax;

    // Risk metrics
    private Double neighborhoodChange;

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
