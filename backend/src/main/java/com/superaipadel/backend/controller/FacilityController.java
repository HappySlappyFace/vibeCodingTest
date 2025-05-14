package com.superaipadel.backend.controller;

import com.superaipadel.backend.dto.response.MessageResponse;
import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.security.services.UserDetailsImpl;
import com.superaipadel.backend.service.FacilityService;
import com.superaipadel.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/facilities")
public class FacilityController {
    
    @Autowired
    private FacilityService facilityService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<Facility>> getAllFacilities() {
        List<Facility> facilities = facilityService.findAll();
        return ResponseEntity.ok(facilities);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable Long id) {
        Facility facility = facilityService.findById(id);
        return ResponseEntity.ok(facility);
    }
    
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Facility>> getFacilitiesByCity(@PathVariable String city) {
        List<Facility> facilities = facilityService.findByCity(city);
        return ResponseEntity.ok(facilities);
    }
    
    @GetMapping("/my-facilities")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Facility>> getMyFacilities(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        List<Facility> facilities = facilityService.findByOwner(user);
        return ResponseEntity.ok(facilities);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Facility> createFacility(@RequestBody Facility facility, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        facility.setOwner(user);
        Facility createdFacility = facilityService.save(facility);
        return ResponseEntity.ok(createdFacility);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Facility> updateFacility(@PathVariable Long id, @RequestBody Facility facilityDetails) {
        Facility updatedFacility = facilityService.update(id, facilityDetails);
        return ResponseEntity.ok(updatedFacility);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> deleteFacility(@PathVariable Long id) {
        facilityService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Facility deleted successfully"));
    }
}
