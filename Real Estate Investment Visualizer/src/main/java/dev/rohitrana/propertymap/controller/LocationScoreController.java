package dev.rohitrana.propertymap.controller;

import dev.rohitrana.propertymap.model.LocationScore;
import dev.rohitrana.propertymap.service.LocationScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/location-scores")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationScoreController {
    private final LocationScoreService locationScoreService;

    @Autowired
    public LocationScoreController(LocationScoreService locationScoreService) {
        this.locationScoreService = locationScoreService;
    }

    @GetMapping
    public ResponseEntity<List<LocationScore>> getAllLocationScores() {
        List<LocationScore> locationScores = locationScoreService.getAllLocationScores();
        return new ResponseEntity<>(locationScores, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationScore> getLocationScoreById(@PathVariable Long id) {
        Optional<LocationScore> locationScore = locationScoreService.getLocationScoreById(id);
        return locationScore.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<LocationScore> createLocationScore(@RequestBody LocationScore locationScore) {
        // Calculate the overall score based on individual metrics
        locationScore.setOverallScore(locationScoreService.calculateOverallScore(locationScore));

        LocationScore savedLocationScore = locationScoreService.saveLocationScore(locationScore);
        return new ResponseEntity<>(savedLocationScore, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationScore> updateLocationScore(@PathVariable Long id, @RequestBody LocationScore locationScore) {
        Optional<LocationScore> existingLocationScore = locationScoreService.getLocationScoreById(id);

        if (existingLocationScore.isPresent()) {
            locationScore.setId(id);

            // Recalculate the overall score based on updated metrics
            locationScore.setOverallScore(locationScoreService.calculateOverallScore(locationScore));

            LocationScore updatedLocationScore = locationScoreService.saveLocationScore(locationScore);
            return new ResponseEntity<>(updatedLocationScore, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteLocationScore(@PathVariable Long id) {
        locationScoreService.deleteLocationScore(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<LocationScore>> filterLocationScores(
            @RequestParam(required = false) Integer minOverallScore,
            @RequestParam(required = false) Integer minPerformanceScore,
            @RequestParam(required = false) Integer minRiskScore,
            @RequestParam(required = false) Integer minDemandScore,
            @RequestParam(required = false) Integer minSupplyScore,
            @RequestParam(required = false) Double minCapRate,
            @RequestParam(required = false) Double minAppreciation) {

        List<LocationScore> locationScores;

        // Apply filters based on provided parameters
        if (minOverallScore != null) {
            locationScores = locationScoreService.getLocationScoresByMinOverallScore(minOverallScore);
        } else if (minPerformanceScore != null) {
            locationScores = locationScoreService.getLocationScoresByMinPerformanceScore(minPerformanceScore);
        } else if (minRiskScore != null) {
            locationScores = locationScoreService.getLocationScoresByMinRiskScore(minRiskScore);
        } else if (minDemandScore != null) {
            locationScores = locationScoreService.getLocationScoresByMinDemandScore(minDemandScore);
        } else if (minSupplyScore != null) {
            locationScores = locationScoreService.getLocationScoresByMinSupplyScore(minSupplyScore);
        } else if (minCapRate != null) {
            locationScores = locationScoreService.getLocationScoresByMinCapRate(minCapRate);
        } else if (minAppreciation != null) {
            locationScores = locationScoreService.getLocationScoresByMinAppreciation(minAppreciation);
        } else {
            locationScores = locationScoreService.getAllLocationScores();
        }

        return new ResponseEntity<>(locationScores, HttpStatus.OK);
    }

    @GetMapping("/bounds")
    public ResponseEntity<List<LocationScore>> getLocationScoresInBounds(
            @RequestParam Double southLat,
            @RequestParam Double northLat,
            @RequestParam Double westLng,
            @RequestParam Double eastLng) {

        List<LocationScore> locationScores = locationScoreService.getLocationScoresInBounds(southLat, northLat, westLng, eastLng);
        return new ResponseEntity<>(locationScores, HttpStatus.OK);
    }
}
