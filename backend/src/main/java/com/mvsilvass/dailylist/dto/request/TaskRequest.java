package com.mvsilvass.dailylist.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record TaskRequest(
    @NotBlank(message = "Título é obrigatória")
    @NotEmpty(message = "Título é obrigatória")
    String title,
    
    @Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres")
    String description,
    
    @URL
    String link,

    byte[] image
    ) {
}
