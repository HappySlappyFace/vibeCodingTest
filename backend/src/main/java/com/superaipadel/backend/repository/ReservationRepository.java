package com.superaipadel.backend.repository;

import com.superaipadel.backend.model.Reservation;
import com.superaipadel.backend.model.Terrain;
import com.superaipadel.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    List<Reservation> findByTerrain(Terrain terrain);
    List<Reservation> findByTerrainAndStatus(Terrain terrain, Reservation.ReservationStatus status);
    List<Reservation> findByUserAndStatus(User user, Reservation.ReservationStatus status);
    
    @Query("SELECT r FROM Reservation r WHERE r.terrain = ?1 AND r.status != 'CANCELLED' AND ((r.startTime <= ?3 AND r.endTime >= ?2) OR (r.startTime >= ?2 AND r.startTime < ?3))")
    List<Reservation> findOverlappingReservations(Terrain terrain, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT r FROM Reservation r WHERE r.terrain.facility.id = ?1")
    List<Reservation> findByFacilityId(Long facilityId);
    
    @Query("SELECT r FROM Reservation r WHERE r.terrain.facility.owner.id = ?1")
    List<Reservation> findByFacilityOwnerId(Long ownerId);
}
