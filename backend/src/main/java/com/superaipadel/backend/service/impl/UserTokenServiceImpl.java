package com.superaipadel.backend.service.impl;

import com.superaipadel.backend.model.TokenPack;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.model.UserToken;
import com.superaipadel.backend.repository.UserTokenRepository;
import com.superaipadel.backend.service.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserTokenServiceImpl implements UserTokenService {

    @Autowired
    private UserTokenRepository userTokenRepository;

    @Override
    public UserToken findById(Long id) {
        return userTokenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User token not found with id: " + id));
    }

    @Override
    public List<UserToken> findByUser(User user) {
        return userTokenRepository.findByUser(user);
    }

    @Override
    public List<UserToken> findValidTokensByUser(User user) {
        return userTokenRepository.findValidTokensByUser(user, LocalDateTime.now());
    }

    @Override
    public Integer countRemainingValidTokens(User user) {
        Integer count = userTokenRepository.countRemainingValidTokens(user, LocalDateTime.now());
        return count != null ? count : 0;
    }

    @Override
    public UserToken purchaseTokens(User user, TokenPack tokenPack) {
        UserToken userToken = new UserToken();
        userToken.setUser(user);
        userToken.setTokenPack(tokenPack);
        userToken.setTokensRemaining(tokenPack.getTokenCount());
        userToken.setPurchaseAmount(tokenPack.getPrice());
        userToken.setPurchaseDate(LocalDateTime.now());
        
        // Set expiry date to 1 year from purchase if needed
        userToken.setExpiryDate(LocalDateTime.now().plusYears(1));
        
        return userTokenRepository.save(userToken);
    }

    @Override
    public UserToken useTokens(User user, Integer tokenCount) {
        List<UserToken> validTokens = findValidTokensByUser(user);
        
        if (validTokens.isEmpty()) {
            throw new RuntimeException("No valid tokens available for user");
        }
        
        int remainingToUse = tokenCount;
        
        for (UserToken token : validTokens) {
            if (remainingToUse <= 0) break;
            
            int available = token.getTokensRemaining();
            if (available >= remainingToUse) {
                token.setTokensRemaining(available - remainingToUse);
                remainingToUse = 0;
                userTokenRepository.save(token);
                return token; // Return the last token used
            } else {
                token.setTokensRemaining(0);
                remainingToUse -= available;
                userTokenRepository.save(token);
            }
        }
        
        if (remainingToUse > 0) {
            throw new RuntimeException("Insufficient tokens available");
        }
        
        return validTokens.get(validTokens.size() - 1); // Return the last token used
    }

    @Override
    public UserToken save(UserToken userToken) {
        return userTokenRepository.save(userToken);
    }

    @Override
    public void deleteById(Long id) {
        userTokenRepository.deleteById(id);
    }
}
