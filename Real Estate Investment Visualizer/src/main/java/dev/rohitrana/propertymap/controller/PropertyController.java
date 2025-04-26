package dev.rohitrana.propertymap.controller;

import dev.rohitrana.propertymap.model.Property;
import dev.rohitrana.propertymap.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController {
    private final PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        return property.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        Property savedProperty = propertyService.saveProperty(property);
        return new ResponseEntity<>(savedProperty, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        Optional<Property> existingProperty = propertyService.getPropertyById(id);

        if (existingProperty.isPresent()) {
            property.setId(id);
            Property updatedProperty = propertyService.saveProperty(property);
            return new ResponseEntity<>(updatedProperty, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Property>> filterProperties(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer minBathrooms,
            @RequestParam(required = false) Integer minSqFt,
            @RequestParam(required = false) Integer maxSqFt,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String zipCode,
            @RequestParam(required = false) Integer minYearBuilt,
            @RequestParam(required = false) BigDecimal minCapRate) {

        List<Property> properties;

        // Apply filters based on provided parameters
        if (city != null) {
            properties = propertyService.getPropertiesByCity(city);
        } else if (status != null) {
            properties = propertyService.getPropertiesByStatus(status);
        } else if (minBedrooms != null) {
            properties = propertyService.getPropertiesByMinBedrooms(minBedrooms);
        } else if (minBathrooms != null) {
            properties = propertyService.getPropertiesByMinBathrooms(minBathrooms);
        } else if (minSqFt != null && maxSqFt != null) {
            properties = propertyService.getPropertiesBySquareFeetRange(minSqFt, maxSqFt);
        } else if (minPrice != null && maxPrice != null) {
            properties = propertyService.getPropertiesByPriceRange(minPrice, maxPrice);
        } else if (zipCode != null) {
            properties = propertyService.getPropertiesByZipCode(zipCode);
        } else if (minYearBuilt != null) {
            properties = propertyService.getPropertiesByMinYearBuilt(minYearBuilt);
        } else if (minCapRate != null) {
            properties = propertyService.getPropertiesByMinCapRate(minCapRate);
        } else {
            properties = propertyService.getAllProperties();
        }

        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    @GetMapping("/bounds")
    public ResponseEntity<List<Property>> getPropertiesInBounds(
            @RequestParam Double southLat,
            @RequestParam Double northLat,
            @RequestParam Double westLng,
            @RequestParam Double eastLng) {

        List<Property> properties = propertyService.getPropertiesInBounds(southLat, northLat, westLng, eastLng);
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }
}
