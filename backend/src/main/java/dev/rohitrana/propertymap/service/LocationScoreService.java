package dev.rohitrana.propertymap.service;

import dev.rohitrana.propertymap.model.LocationScore;
import dev.rohitrana.propertymap.repository.LocationScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LocationScoreService {
    private final LocationScoreRepository locationScoreRepository;

    @Autowired
    public LocationScoreService(LocationScoreRepository locationScoreRepository) {
        this.locationScoreRepository = locationScoreRepository;
    }

    public List<LocationScore> getAllLocationScores() {
        return locationScoreRepository.findAll();
    }

    public Optional<LocationScore> getLocationScoreById(Long id) {
        return locationScoreRepository.findById(id);
    }

    public LocationScore saveLocationScore(LocationScore locationScore) {
        return locationScoreRepository.save(locationScore);
    }

    public void deleteLocationScore(Long id) {
        locationScoreRepository.deleteById(id);
    }

    public List<LocationScore> getLocationScoresByMinOverallScore(Integer minScore) {
        return locationScoreRepository.findByOverallScoreGreaterThanEqual(minScore);
    }

    public List<LocationScore> getLocationScoresByMinPerformanceScore(Integer minScore) {
        return locationScoreRepository.findByPerformanceScoreGreaterThanEqual(minScore);
    }

    public List<LocationScore> getLocationScoresByMinRiskScore(Integer minScore) {
        return locationScoreRepository.findByRiskScoreGreaterThanEqual(minScore);
    }

    public List<LocationScore> getLocationScoresByMinDemandScore(Integer minScore) {
        return locationScoreRepository.findByDemandScoreGreaterThanEqual(minScore);
    }

    public List<LocationScore> getLocationScoresByMinSupplyScore(Integer minScore) {
        return locationScoreRepository.findBySupplyScoreGreaterThanEqual(minScore);
    }

    public List<LocationScore> getLocationScoresInBounds(Double southLat, Double northLat, Double westLng, Double eastLng) {
        return locationScoreRepository.findLocationScoresInBounds(southLat, northLat, westLng, eastLng);
    }

    public List<LocationScore> getLocationScoresByMinCapRate(Double minCapRate) {
        return locationScoreRepository.findByMinimumCapRate(minCapRate);
    }

    public List<LocationScore> getLocationScoresByMinAppreciation(Double minAppreciation) {
        return locationScoreRepository.findByMinimumAppreciation(minAppreciation);
    }

    // Calculate overall score based on individual scores
    public int calculateOverallScore(LocationScore locationScore) {
        int performanceWeight = 3;
        int riskWeight = 2;
        int demandWeight = 2;
        int supplyWeight = 1;

        int weightedSum =
                (locationScore.getPerformanceScore() * performanceWeight) +
                        (locationScore.getRiskScore() * riskWeight) +
                        (locationScore.getDemandScore() * demandWeight) +
                        (locationScore.getSupplyScore() * supplyWeight);

        int totalWeight = performanceWeight + riskWeight + demandWeight + supplyWeight;

        return weightedSum / totalWeight;
    }
}
