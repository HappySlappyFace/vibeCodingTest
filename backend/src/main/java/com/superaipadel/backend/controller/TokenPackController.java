package com.superaipadel.backend.controller;

import com.superaipadel.backend.dto.response.MessageResponse;
import com.superaipadel.backend.model.TokenPack;
import com.superaipadel.backend.service.TokenPackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/token-packs")
public class TokenPackController {
    
    @Autowired
    private TokenPackService tokenPackService;
    
    @GetMapping
    public ResponseEntity<List<TokenPack>> getAllTokenPacks() {
        List<TokenPack> tokenPacks = tokenPackService.findByActive(true);
        return ResponseEntity.ok(tokenPacks);
    }
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<TokenPack>> getAllTokenPacksAdmin() {
        List<TokenPack> tokenPacks = tokenPackService.findAll();
        return ResponseEntity.ok(tokenPacks);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TokenPack> getTokenPackById(@PathVariable Long id) {
        TokenPack tokenPack = tokenPackService.findById(id);
        return ResponseEntity.ok(tokenPack);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<TokenPack> createTokenPack(@RequestBody TokenPack tokenPack) {
        TokenPack createdTokenPack = tokenPackService.save(tokenPack);
        return ResponseEntity.ok(createdTokenPack);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<TokenPack> updateTokenPack(@PathVariable Long id, @RequestBody TokenPack tokenPackDetails) {
        TokenPack updatedTokenPack = tokenPackService.update(id, tokenPackDetails);
        return ResponseEntity.ok(updatedTokenPack);
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<TokenPack> updateTokenPackStatus(@PathVariable Long id, @RequestParam boolean active) {
        TokenPack updatedTokenPack = tokenPackService.setActive(id, active);
        return ResponseEntity.ok(updatedTokenPack);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> deleteTokenPack(@PathVariable Long id) {
        tokenPackService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Token pack deleted successfully"));
    }
}
