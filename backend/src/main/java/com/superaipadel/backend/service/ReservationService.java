package com.superaipadel.backend.service;

import com.superaipadel.backend.model.Reservation;
import com.superaipadel.backend.model.Terrain;
import com.superaipadel.backend.model.User;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationService {
    Reservation findById(Long id);
    List<Reservation> findAll();
    List<Reservation> findByUser(User user);
    List<Reservation> findByTerrain(Terrain terrain);
    List<Reservation> findByTerrainAndStatus(Terrain terrain, Reservation.ReservationStatus status);
    List<Reservation> findByUserAndStatus(User user, Reservation.ReservationStatus status);
    List<Reservation> findOverlappingReservations(Terrain terrain, LocalDateTime start, LocalDateTime end);
    List<Reservation> findByFacilityId(Long facilityId);
    List<Reservation> findByFacilityOwnerId(Long ownerId);
    Reservation save(Reservation reservation);
    Reservation update(Long id, Reservation reservationDetails);
    void deleteById(Long id);
    Reservation changeStatus(Long id, Reservation.ReservationStatus status);
    boolean isTimeSlotAvailable(Terrain terrain, LocalDateTime start, LocalDateTime end);
}
