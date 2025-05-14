package com.superaipadel.backend.repository;

import com.superaipadel.backend.model.User;
import com.superaipadel.backend.model.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, Long> {
    List<UserToken> findByUser(User user);
    
    @Query("SELECT ut FROM UserToken ut WHERE ut.user = ?1 AND ut.tokensRemaining > 0 AND (ut.expiryDate IS NULL OR ut.expiryDate > ?2)")
    List<UserToken> findValidTokensByUser(User user, LocalDateTime currentDate);
    
    @Query("SELECT SUM(ut.tokensRemaining) FROM UserToken ut WHERE ut.user = ?1 AND (ut.expiryDate IS NULL OR ut.expiryDate > ?2)")
    Integer countRemainingValidTokens(User user, LocalDateTime currentDate);
}
