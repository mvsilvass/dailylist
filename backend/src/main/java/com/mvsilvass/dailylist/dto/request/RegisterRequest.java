package com.mvsilvass.dailylist.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record RegisterRequest(
    @NotEmpty(message = "Email é obrigatório") String email,
    @NotEmpty(message = "Senha é obrigatória")  String password){
}
