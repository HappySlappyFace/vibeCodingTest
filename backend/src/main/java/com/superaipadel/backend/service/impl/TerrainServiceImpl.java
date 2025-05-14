package com.superaipadel.backend.service.impl;

import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.Terrain;
import com.superaipadel.backend.repository.TerrainRepository;
import com.superaipadel.backend.service.TerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerrainServiceImpl implements TerrainService {

    @Autowired
    private TerrainRepository terrainRepository;

    @Override
    public Terrain findById(Long id) {
        return terrainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Terrain not found with id: " + id));
    }

    @Override
    public List<Terrain> findAll() {
        return terrainRepository.findAll();
    }

    @Override
    public List<Terrain> findByFacility(Facility facility) {
        return terrainRepository.findByFacility(facility);
    }

    @Override
    public List<Terrain> findByFacilityAndActive(Facility facility, boolean active) {
        return terrainRepository.findByFacilityAndActive(facility, active);
    }

    @Override
    public List<Terrain> findByActive(boolean active) {
        return terrainRepository.findByActive(active);
    }

    @Override
    public Terrain save(Terrain terrain) {
        return terrainRepository.save(terrain);
    }

    @Override
    public Terrain update(Long id, Terrain terrainDetails) {
        Terrain terrain = findById(id);
        
        terrain.setName(terrainDetails.getName());
        terrain.setDescription(terrainDetails.getDescription());
        terrain.setImageUrl(terrainDetails.getImageUrl());
        terrain.setPricePerHour(terrainDetails.getPricePerHour());
        terrain.setIndoor(terrainDetails.isIndoor());
        terrain.setType(terrainDetails.getType());
        
        return terrainRepository.save(terrain);
    }

    @Override
    public void deleteById(Long id) {
        terrainRepository.deleteById(id);
    }

    @Override
    public void setTerrainStatus(Long id, boolean active) {
        Terrain terrain = findById(id);
        terrain.setActive(active);
        terrainRepository.save(terrain);
    }
}
