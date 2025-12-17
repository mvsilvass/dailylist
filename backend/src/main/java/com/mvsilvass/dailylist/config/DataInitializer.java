package com.mvsilvass.dailylist.config;

import com.mvsilvass.dailylist.model.Role;
import com.mvsilvass.dailylist.model.User;
import com.mvsilvass.dailylist.repository.RoleRepository;
import com.mvsilvass.dailylist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Value("${admin.default.password}")
    private String adminPassword;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           BCryptPasswordEncoder passwordEncoder){
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        for (Role.Values roleValue : Role.Values.values()){
            roleRepository.findByName(roleValue.name())
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(roleValue.name());
                    return roleRepository.save(role);
                });
        }

        Set<Role> roles = Set.copyOf(roleRepository.findAll());
        if(userRepository.findByEmail("admin@teste.com").isEmpty()){
            User admin = new User();
            admin.setEmail("admin@teste.com");
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRoles(roles);

            userRepository.save(admin);
        }
    }
}
