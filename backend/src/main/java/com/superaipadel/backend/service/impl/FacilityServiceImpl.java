package com.superaipadel.backend.service.impl;

import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.repository.FacilityRepository;
import com.superaipadel.backend.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilityServiceImpl implements FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    @Override
    public Facility findById(Long id) {
        return facilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));
    }

    @Override
    public List<Facility> findAll() {
        return facilityRepository.findAll();
    }

    @Override
    public List<Facility> findByOwner(User owner) {
        return facilityRepository.findByOwner(owner);
    }

    @Override
    public List<Facility> findByCity(String city) {
        return facilityRepository.findByCity(city);
    }

    @Override
    public Facility save(Facility facility) {
        return facilityRepository.save(facility);
    }

    @Override
    public Facility update(Long id, Facility facilityDetails) {
        Facility facility = findById(id);
        
        facility.setName(facilityDetails.getName());
        facility.setAddress(facilityDetails.getAddress());
        facility.setCity(facilityDetails.getCity());
        facility.setDescription(facilityDetails.getDescription());
        facility.setImageUrl(facilityDetails.getImageUrl());
        facility.setContactPhone(facilityDetails.getContactPhone());
        facility.setContactEmail(facilityDetails.getContactEmail());
        facility.setOpeningHours(facilityDetails.getOpeningHours());
        
        return facilityRepository.save(facility);
    }

    @Override
    public void deleteById(Long id) {
        facilityRepository.deleteById(id);
    }
}
