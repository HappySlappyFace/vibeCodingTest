package com.superaipadel.backend.service;

import com.superaipadel.backend.model.Role;
import com.superaipadel.backend.model.User;

import java.util.List;

public interface UserService {
    User findById(Long id);
    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findAll();
    User save(User user);
    void deleteById(Long id);
    User updateProfile(Long id, User userDetails);
    List<User> findUsersByRole(Role.ERole role);
}
