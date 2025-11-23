package com.mvsilvass.dailylist.dto.response;

import com.mvsilvass.dailylist.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.Date;

public record TaskResponse(
    String title,
    String description,
    byte[] image,
    String link,
    Date createdAt,
    Date updateAt) {
    
    public static TaskResponse from(Task task) {
        return new TaskResponse(
            task.getTitle(),
            task.getDescription(),
            task.getImage(),
            task.getLink(),
            task.getCreatedAt(),
            task.getUpdateAt()
        );
    }
}
