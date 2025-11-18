package com.mvsilvass.dailylist.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(
    @NotEmpty(message = "Email é obrigatório")
    @Email(message = "O email deve ter um formato válido")
    String email,
    
    @NotBlank(message = "Senha é obrigatória")
    String password){
}
