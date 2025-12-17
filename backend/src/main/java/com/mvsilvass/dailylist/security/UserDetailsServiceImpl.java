package com.mvsilvass.dailylist.security;

import com.mvsilvass.dailylist.excepiton.UserNotFoundException;
import com.mvsilvass.dailylist.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmailIgnoreCase(email)
            .map(UserAuthenticated::new)
            .orElseThrow(
                () -> new UsernameNotFoundException("Usuário não encontrado"));
    }
}
