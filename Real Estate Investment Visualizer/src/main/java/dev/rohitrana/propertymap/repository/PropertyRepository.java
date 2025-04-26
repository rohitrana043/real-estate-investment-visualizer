package dev.rohitrana.propertymap.repository;

import dev.rohitrana.propertymap.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface  PropertyRepository extends JpaRepository<Property, Long>{
    List<Property> findByCity(String city);

    List<Property> findByStatus(String status);

    List<Property> findByBedroomsGreaterThanEqual(Integer bedrooms);

    List<Property> findByBathroomsGreaterThanEqual(Integer bathrooms);

    List<Property> findBySquareFeetBetween(Integer minSqFt, Integer maxSqFt);

    List<Property> findByListPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    List<Property> findByZipCode(String zipCode);

    List<Property> findByYearBuiltGreaterThanEqual(Integer yearBuilt);

    @Query("SELECT p FROM Property p WHERE " +
            "p.latitude BETWEEN :southLat AND :northLat AND " +
            "p.longitude BETWEEN :westLng AND :eastLng")
    List<Property> findPropertiesInBounds(Double southLat, Double northLat, Double westLng, Double eastLng);

    @Query("SELECT p FROM Property p WHERE " +
            "p.capRate >= :minCapRate")
    List<Property> findByMinimumCapRate(BigDecimal minCapRate);
}
