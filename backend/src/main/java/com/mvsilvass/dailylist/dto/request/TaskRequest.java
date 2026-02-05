package com.mvsilvass.dailylist.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.util.Date;

public record TaskRequest(
    @NotBlank(message = "Título é obrigatória")
    String title,
    
    @Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres")
    String description,
    
    @URL
    String link,
    
    @NotNull(message = "A data da tarefa é obrigatória")
    Date targetDate,
    
    @URL
    String image,
    
    int priority,
    
    boolean isDone
    ) {
}
