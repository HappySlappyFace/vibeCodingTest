package com.superaipadel.backend.repository;

import com.superaipadel.backend.model.TokenPack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TokenPackRepository extends JpaRepository<TokenPack, Long> {
    List<TokenPack> findByActive(boolean active);
}
