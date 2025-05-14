package com.superaipadel.backend.repository;

import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TerrainRepository extends JpaRepository<Terrain, Long> {
    List<Terrain> findByFacility(Facility facility);
    List<Terrain> findByFacilityAndActive(Facility facility, boolean active);
    List<Terrain> findByActive(boolean active);
}
