package dev.rohitrana.propertymap.service;

import dev.rohitrana.propertymap.model.Property;
import dev.rohitrana.propertymap.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    public List<Property> getPropertiesByCity(String city) {
        return propertyRepository.findByCity(city);
    }

    public List<Property> getPropertiesByStatus(String status) {
        return propertyRepository.findByStatus(status);
    }

    public List<Property> getPropertiesByMinBedrooms(Integer minBedrooms) {
        return propertyRepository.findByBedroomsGreaterThanEqual(minBedrooms);
    }

    public List<Property> getPropertiesByMinBathrooms(Integer minBathrooms) {
        return propertyRepository.findByBathroomsGreaterThanEqual(minBathrooms);
    }

    public List<Property> getPropertiesBySquareFeetRange(Integer minSqFt, Integer maxSqFt) {
        return propertyRepository.findBySquareFeetBetween(minSqFt, maxSqFt);
    }

    public List<Property> getPropertiesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return propertyRepository.findByListPriceBetween(minPrice, maxPrice);
    }

    public List<Property> getPropertiesByZipCode(String zipCode) {
        return propertyRepository.findByZipCode(zipCode);
    }

    public List<Property> getPropertiesByMinYearBuilt(Integer yearBuilt) {
        return propertyRepository.findByYearBuiltGreaterThanEqual(yearBuilt);
    }

    public List<Property> getPropertiesInBounds(Double southLat, Double northLat, Double westLng, Double eastLng) {
        return propertyRepository.findPropertiesInBounds(southLat, northLat, westLng, eastLng);
    }

    public List<Property> getPropertiesByMinCapRate(BigDecimal minCapRate) {
        return propertyRepository.findByMinimumCapRate(minCapRate);
    }

    // Calculate investment metrics for a property
    public BigDecimal calculateCapRate(Property property) {
        if (property.getMonthlyRent() == null || property.getYearlyExpenses() == null || property.getListPrice() == null
                || property.getListPrice().compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        // Annual rent
        BigDecimal annualRent = property.getMonthlyRent().multiply(new BigDecimal("12"));

        // Net operating income (NOI)
        BigDecimal noi = annualRent.subtract(property.getYearlyExpenses());

        // Cap rate = NOI / Property Price
        return noi.divide(property.getListPrice(), 4, BigDecimal.ROUND_HALF_UP)
                .multiply(new BigDecimal("100")); // Convert to percentage
    }
}
