package com.superaipadel.backend.service.impl;

import com.superaipadel.backend.model.TokenPack;
import com.superaipadel.backend.repository.TokenPackRepository;
import com.superaipadel.backend.service.TokenPackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TokenPackServiceImpl implements TokenPackService {

    @Autowired
    private TokenPackRepository tokenPackRepository;

    @Override
    public TokenPack findById(Long id) {
        return tokenPackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Token pack not found with id: " + id));
    }

    @Override
    public List<TokenPack> findAll() {
        return tokenPackRepository.findAll();
    }

    @Override
    public List<TokenPack> findByActive(boolean active) {
        return tokenPackRepository.findByActive(active);
    }

    @Override
    public TokenPack save(TokenPack tokenPack) {
        return tokenPackRepository.save(tokenPack);
    }

    @Override
    public TokenPack update(Long id, TokenPack tokenPackDetails) {
        TokenPack tokenPack = findById(id);
        
        tokenPack.setName(tokenPackDetails.getName());
        tokenPack.setDescription(tokenPackDetails.getDescription());
        tokenPack.setTokenCount(tokenPackDetails.getTokenCount());
        tokenPack.setPrice(tokenPackDetails.getPrice());
        tokenPack.setDiscount(tokenPackDetails.getDiscount());
        
        return tokenPackRepository.save(tokenPack);
    }

    @Override
    public void deleteById(Long id) {
        tokenPackRepository.deleteById(id);
    }

    @Override
    public TokenPack setActive(Long id, boolean active) {
        TokenPack tokenPack = findById(id);
        tokenPack.setActive(active);
        return tokenPackRepository.save(tokenPack);
    }
}
