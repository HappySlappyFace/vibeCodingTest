package com.superaipadel.backend.service;

import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.Terrain;

import java.util.List;

public interface TerrainService {
    Terrain findById(Long id);
    List<Terrain> findAll();
    List<Terrain> findByFacility(Facility facility);
    List<Terrain> findByFacilityAndActive(Facility facility, boolean active);
    List<Terrain> findByActive(boolean active);
    Terrain save(Terrain terrain);
    Terrain update(Long id, Terrain terrainDetails);
    void deleteById(Long id);
    void setTerrainStatus(Long id, boolean active);
}
