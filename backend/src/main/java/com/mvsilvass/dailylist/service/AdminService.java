package com.mvsilvass.dailylist.service;

import com.mvsilvass.dailylist.model.User;
import com.mvsilvass.dailylist.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    private final UserRepository userRepository;
    
    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
    
    public void deleteUserById(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        userRepository.deleteById(userId);
        
    }
    
}
