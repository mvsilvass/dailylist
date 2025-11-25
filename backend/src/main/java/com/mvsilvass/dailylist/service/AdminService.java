package com.mvsilvass.dailylist.service;

import com.mvsilvass.dailylist.excepiton.UserNotFoundException;
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
            .orElseThrow(() -> new UserNotFoundException("Usuário com id " + userId + " não encontrado"));
    }
    
    public void deleteUserById(Long userId) {
        userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("Usuário com id " + userId + " não encontrado"));
        
        userRepository.deleteById(userId);
        
    }
    
    public User deactivateUser(Long userId){
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("Usuário com id " + userId + " não encontrado"));
        
        user.setEnabled(false);
        userRepository.save(user);
        return user;
    }
    
    public User activateUser(Long userId){
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("Usuário com id " + userId + " não encontrado"));
        
        user.setEnabled(true);
        userRepository.save(user);
        return user;
    }
    
}
