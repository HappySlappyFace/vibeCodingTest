package com.superaipadel.backend.service;

import com.superaipadel.backend.model.TokenPack;
import com.superaipadel.backend.model.User;
import com.superaipadel.backend.model.UserToken;

import java.time.LocalDateTime;
import java.util.List;

public interface UserTokenService {
    UserToken findById(Long id);
    List<UserToken> findByUser(User user);
    List<UserToken> findValidTokensByUser(User user);
    Integer countRemainingValidTokens(User user);
    UserToken purchaseTokens(User user, TokenPack tokenPack);
    UserToken useTokens(User user, Integer tokenCount);
    UserToken save(UserToken userToken);
    void deleteById(Long id);
}
