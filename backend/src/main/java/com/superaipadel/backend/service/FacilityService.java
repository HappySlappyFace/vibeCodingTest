package com.superaipadel.backend.service;

import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.User;

import java.util.List;

public interface FacilityService {
    Facility findById(Long id);
    List<Facility> findAll();
    List<Facility> findByOwner(User owner);
    List<Facility> findByCity(String city);
    Facility save(Facility facility);
    Facility update(Long id, Facility facilityDetails);
    void deleteById(Long id);
}
