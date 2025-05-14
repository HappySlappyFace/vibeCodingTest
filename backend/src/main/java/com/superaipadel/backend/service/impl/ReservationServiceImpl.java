package com.superaipadel.backend.service.impl;

import com.superaipadel.backend.model.Reservation;
import com.superaipadel.backend.model.Terrain;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.repository.ReservationRepository;
import com.superaipadel.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public Reservation findById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
    }

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> findByUser(User user) {
        return reservationRepository.findByUser(user);
    }

    @Override
    public List<Reservation> findByTerrain(Terrain terrain) {
        return reservationRepository.findByTerrain(terrain);
    }

    @Override
    public List<Reservation> findByTerrainAndStatus(Terrain terrain, Reservation.ReservationStatus status) {
        return reservationRepository.findByTerrainAndStatus(terrain, status);
    }

    @Override
    public List<Reservation> findByUserAndStatus(User user, Reservation.ReservationStatus status) {
        return reservationRepository.findByUserAndStatus(user, status);
    }

    @Override
    public List<Reservation> findOverlappingReservations(Terrain terrain, LocalDateTime start, LocalDateTime end) {
        return reservationRepository.findOverlappingReservations(terrain, start, end);
    }

    @Override
    public List<Reservation> findByFacilityId(Long facilityId) {
        return reservationRepository.findByFacilityId(facilityId);
    }

    @Override
    public List<Reservation> findByFacilityOwnerId(Long ownerId) {
        return reservationRepository.findByFacilityOwnerId(ownerId);
    }

    @Override
    public Reservation save(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation update(Long id, Reservation reservationDetails) {
        Reservation reservation = findById(id);
        
        reservation.setStartTime(reservationDetails.getStartTime());
        reservation.setEndTime(reservationDetails.getEndTime());
        reservation.setPrice(reservationDetails.getPrice());
        reservation.setNotes(reservationDetails.getNotes());
        
        return reservationRepository.save(reservation);
    }

    @Override
    public void deleteById(Long id) {
        reservationRepository.deleteById(id);
    }

    @Override
    public Reservation changeStatus(Long id, Reservation.ReservationStatus status) {
        Reservation reservation = findById(id);
        reservation.setStatus(status);
        
        if (status == Reservation.ReservationStatus.CANCELLED) {
            reservation.setCancelledAt(LocalDateTime.now());
        }
        
        return reservationRepository.save(reservation);
    }

    @Override
    public boolean isTimeSlotAvailable(Terrain terrain, LocalDateTime start, LocalDateTime end) {
        List<Reservation> overlappingReservations = findOverlappingReservations(terrain, start, end);
        return overlappingReservations.isEmpty();
    }
}
