package com.superaipadel.backend.controller;

import com.superaipadel.backend.dto.response.MessageResponse;
import com.superaipadel.backend.model.TokenPack;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.model.UserToken;
import com.superaipadel.backend.security.services.UserDetailsImpl;
import com.superaipadel.backend.service.TokenPackService;
import com.superaipadel.backend.service.UserService;
import com.superaipadel.backend.service.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user-tokens")
public class UserTokenController {
    
    @Autowired
    private UserTokenService userTokenService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private TokenPackService tokenPackService;
    
    @GetMapping("/my-tokens")
    public ResponseEntity<List<UserToken>> getMyTokens(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        List<UserToken> userTokens = userTokenService.findByUser(user);
        return ResponseEntity.ok(userTokens);
    }
    
    @GetMapping("/my-valid-tokens")
    public ResponseEntity<List<UserToken>> getMyValidTokens(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        List<UserToken> userTokens = userTokenService.findValidTokensByUser(user);
        return ResponseEntity.ok(userTokens);
    }
    
    @GetMapping("/my-token-count")
    public ResponseEntity<Integer> getMyTokenCount(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.findById(userDetails.getId());
        Integer tokenCount = userTokenService.countRemainingValidTokens(user);
        return ResponseEntity.ok(tokenCount);
    }
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<UserToken>> getUserTokensByUserId(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<UserToken> userTokens = userTokenService.findByUser(user);
        return ResponseEntity.ok(userTokens);
    }
    
    @PostMapping("/purchase/{tokenPackId}")
    public ResponseEntity<UserToken> purchaseTokens(
            @PathVariable Long tokenPackId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        User user = userService.findById(userDetails.getId());
        TokenPack tokenPack = tokenPackService.findById(tokenPackId);
        
        // Ensure token pack is active
        if (!tokenPack.isActive()) {
            throw new RuntimeException("The selected token pack is not available for purchase");
        }
        
        UserToken userToken = userTokenService.purchaseTokens(user, tokenPack);
        return ResponseEntity.ok(userToken);
    }
    
    @PostMapping("/use-tokens")
    public ResponseEntity<MessageResponse> useTokens(
            @RequestParam Integer tokenCount,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        User user = userService.findById(userDetails.getId());
        
        try {
            userTokenService.useTokens(user, tokenCount);
            return ResponseEntity.ok(new MessageResponse(tokenCount + " tokens used successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
