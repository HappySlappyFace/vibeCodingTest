package com.superaipadel.backend.repository;

import com.superaipadel.backend.model.Facility;
import com.superaipadel.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findByOwner(User owner);
    List<Facility> findByCity(String city);
}
