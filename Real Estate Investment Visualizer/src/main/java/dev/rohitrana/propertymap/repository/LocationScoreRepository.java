package dev.rohitrana.propertymap.repository;

import dev.rohitrana.propertymap.model.LocationScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocationScoreRepository extends JpaRepository<LocationScore, Long>{
    List<LocationScore> findByOverallScoreGreaterThanEqual(Integer minScore);

    List<LocationScore> findByPerformanceScoreGreaterThanEqual(Integer minScore);

    List<LocationScore> findByRiskScoreGreaterThanEqual(Integer minScore);

    List<LocationScore> findByDemandScoreGreaterThanEqual(Integer minScore);

    List<LocationScore> findBySupplyScoreGreaterThanEqual(Integer minScore);

    @Query("SELECT ls FROM LocationScore ls WHERE " +
            "ls.latitude BETWEEN :southLat AND :northLat AND " +
            "ls.longitude BETWEEN :westLng AND :eastLng")
    List<LocationScore> findLocationScoresInBounds(Double southLat, Double northLat, Double westLng, Double eastLng);

    @Query("SELECT ls FROM LocationScore ls WHERE " +
            "ls.capRate >= :minCapRate")
    List<LocationScore> findByMinimumCapRate(Double minCapRate);

    @Query("SELECT ls FROM LocationScore ls WHERE " +
            "ls.appreciation >= :minAppreciation")
    List<LocationScore> findByMinimumAppreciation(Double minAppreciation);
}
