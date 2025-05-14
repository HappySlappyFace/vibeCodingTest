package com.superaipadel.backend.service;

import com.superaipadel.backend.model.TokenPack;

import java.util.List;

public interface TokenPackService {
    TokenPack findById(Long id);
    List<TokenPack> findAll();
    List<TokenPack> findByActive(boolean active);
    TokenPack save(TokenPack tokenPack);
    TokenPack update(Long id, TokenPack tokenPackDetails);
    void deleteById(Long id);
    TokenPack setActive(Long id, boolean active);
}
