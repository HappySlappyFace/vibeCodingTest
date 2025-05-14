package com.superaipadel.backend.controller;

import com.superaipadel.backend.dto.response.MessageResponse;
import com.superaipadel.backend.model.Reservation;
import com.superaipadel.backend.model.Terrain;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.security.services.UserDetailsImpl;
import com.superaipadel.backend.service.ReservationService;
import com.superaipadel.backend.service.TerrainService;
import com.superaipadel.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    
    @Autowired
    private ReservationService reservationService;
    
    @Autowired
    private TerrainService terrainService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.findAll();
        return ResponseEntity.ok(reservations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Reservation reservation = reservationService.findById(id);
        return ResponseEntity.ok(reservation);
    }
    
    @GetMapping("/my-reservations")
    public ResponseEntity<List<Reservation>> getMyReservations(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        List<Reservation> reservations = reservationService.findByUser(user);
        return ResponseEntity.ok(reservations);
    }
    
    @GetMapping("/terrain/{terrainId}")
    public ResponseEntity<List<Reservation>> getReservationsByTerrain(@PathVariable Long terrainId) {
        Terrain terrain = terrainService.findById(terrainId);
        List<Reservation> reservations = reservationService.findByTerrain(terrain);
        return ResponseEntity.ok(reservations);
    }
    
    @GetMapping("/facility/{facilityId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Reservation>> getReservationsByFacility(@PathVariable Long facilityId) {
        List<Reservation> reservations = reservationService.findByFacilityId(facilityId);
        return ResponseEntity.ok(reservations);
    }
    
    @GetMapping("/check-availability")
    public ResponseEntity<?> checkAvailability(
            @RequestParam Long terrainId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        
        Terrain terrain = terrainService.findById(terrainId);
        boolean isAvailable = reservationService.isTimeSlotAvailable(terrain, startTime, endTime);
        
        if (isAvailable) {
            return ResponseEntity.ok(new MessageResponse("Time slot is available"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Time slot is not available"));
        }
    }
    
    @PostMapping("/terrain/{terrainId}")
    public ResponseEntity<Reservation> createReservation(
            @PathVariable Long terrainId,
            @RequestBody Reservation reservation,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        User user = userService.findById(userDetails.getId());
        Terrain terrain = terrainService.findById(terrainId);
        
        // Check if time slot is available
        if (!reservationService.isTimeSlotAvailable(terrain, reservation.getStartTime(), reservation.getEndTime())) {
            throw new RuntimeException("The selected time slot is not available");
        }
        
        reservation.setUser(user);
        reservation.setTerrain(terrain);
        reservation.setStatus(Reservation.ReservationStatus.CONFIRMED);
        reservation.setCreatedAt(LocalDateTime.now());
        
        // Calculate price based on terrain price and duration
        long hours = java.time.Duration.between(reservation.getStartTime(), reservation.getEndTime()).toHours();
        reservation.setPrice(terrain.getPricePerHour().multiply(java.math.BigDecimal.valueOf(hours)));
        
        Reservation createdReservation = reservationService.save(reservation);
        return ResponseEntity.ok(createdReservation);
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or @reservationSecurity.isReservationOwner(#id)")
    public ResponseEntity<Reservation> updateReservationStatus(
            @PathVariable Long id,
            @RequestParam Reservation.ReservationStatus status) {
        
        Reservation updatedReservation = reservationService.changeStatus(id, status);
        return ResponseEntity.ok(updatedReservation);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> deleteReservation(@PathVariable Long id) {
        reservationService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Reservation deleted successfully"));
    }
}
