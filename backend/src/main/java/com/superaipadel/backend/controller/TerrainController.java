package com.superaipadel.backend.controller;

import com.superaipadel.backend.dto.response.MessageResponse;
import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.Terrain;
import com.superaipadel.backend.service.FacilityService;
import com.superaipadel.backend.service.TerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/terrains")
public class TerrainController {
    
    @Autowired
    private TerrainService terrainService;
    
    @Autowired
    private FacilityService facilityService;
    
    @GetMapping
    public ResponseEntity<List<Terrain>> getAllTerrains() {
        List<Terrain> terrains = terrainService.findByActive(true);
        return ResponseEntity.ok(terrains);
    }
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Terrain>> getAllTerrainsAdmin() {
        List<Terrain> terrains = terrainService.findAll();
        return ResponseEntity.ok(terrains);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Terrain> getTerrainById(@PathVariable Long id) {
        Terrain terrain = terrainService.findById(id);
        return ResponseEntity.ok(terrain);
    }
    
    @GetMapping("/facility/{facilityId}")
    public ResponseEntity<List<Terrain>> getTerrainsByFacility(@PathVariable Long facilityId) {
        Facility facility = facilityService.findById(facilityId);
        List<Terrain> terrains = terrainService.findByFacilityAndActive(facility, true);
        return ResponseEntity.ok(terrains);
    }
    
    @GetMapping("/facility/{facilityId}/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Terrain>> getAllTerrainsByFacility(@PathVariable Long facilityId) {
        Facility facility = facilityService.findById(facilityId);
        List<Terrain> terrains = terrainService.findByFacility(facility);
        return ResponseEntity.ok(terrains);
    }
    
    @PostMapping("/facility/{facilityId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Terrain> createTerrain(@PathVariable Long facilityId, @RequestBody Terrain terrain) {
        Facility facility = facilityService.findById(facilityId);
        terrain.setFacility(facility);
        Terrain createdTerrain = terrainService.save(terrain);
        return ResponseEntity.ok(createdTerrain);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Terrain> updateTerrain(@PathVariable Long id, @RequestBody Terrain terrainDetails) {
        Terrain updatedTerrain = terrainService.update(id, terrainDetails);
        return ResponseEntity.ok(updatedTerrain);
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Terrain> updateTerrainStatus(@PathVariable Long id, @RequestParam boolean active) {
        terrainService.setTerrainStatus(id, active);
        return ResponseEntity.ok(terrainService.findById(id));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> deleteTerrain(@PathVariable Long id) {
        terrainService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Terrain deleted successfully"));
    }
}
