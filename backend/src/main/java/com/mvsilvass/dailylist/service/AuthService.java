package com.mvsilvass.dailylist.service;

import com.mvsilvass.dailylist.dto.request.LoginRequest;
import com.mvsilvass.dailylist.dto.request.RegisterRequest;
import com.mvsilvass.dailylist.dto.response.LoginResponse;
import com.mvsilvass.dailylist.dto.response.RegisterResponse;
import com.mvsilvass.dailylist.excepiton.RoleNotFoundException;
import com.mvsilvass.dailylist.excepiton.UserAlreadyExistsException;
import com.mvsilvass.dailylist.model.Role;
import com.mvsilvass.dailylist.model.User;
import com.mvsilvass.dailylist.repository.RoleRepository;
import com.mvsilvass.dailylist.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final JwtEncoder jwtEncoder;
    
    public AuthService(AuthenticationManager authenticationManager,
                       BCryptPasswordEncoder passwordEncoder,
                       RoleRepository roleRepository,
                       UserRepository userRepository,
                       JwtEncoder jwtEncoder) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.jwtEncoder = jwtEncoder;
    }
    
    public LoginResponse authenticate(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
        );
        
        Instant now = Instant.now();
        long expiresIn = 3000L;
        
        String scope = authentication
            .getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));
        
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("dailylist")
            .issuedAt(now)
            .expiresAt(now.plusSeconds(expiresIn))
            .subject(authentication.getName())
            .claim("scope", scope)
            .build();
        
        String jwtToken = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        
        return new LoginResponse(jwtToken, expiresIn);
    }
    
    public RegisterResponse register(RegisterRequest registerRequest) {
        Optional<User> userFromDb = userRepository.findByEmailIgnoreCase(registerRequest.email());
        
        if(userFromDb.isPresent()){
            throw new UserAlreadyExistsException("Email já cadrastrado");
        }
        
        Optional<Role> basicRole = roleRepository.findByName(Role.Values.BASIC.name());
        User newUser = new User();
        newUser.setEmail(registerRequest.email().toLowerCase());
        newUser.setPassword(passwordEncoder.encode(registerRequest.password()));
        newUser.setRoles(Set.of(
            basicRole.orElseThrow(() ->
                new RoleNotFoundException("Role: " + Role.Values.BASIC.name() + " não foi encontrada"))
        ));
        
        userRepository.save(newUser);
        
        return new RegisterResponse("Usuário cadastrado com sucesso");
    
    }
}
