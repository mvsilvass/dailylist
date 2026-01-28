package com.mvsilvass.dailylist.dto.response;

import com.mvsilvass.dailylist.model.Task;

import java.util.Date;

public record TaskResponse(
    Long id,
    String title,
    String description,
    String image,
    String link,
    Date createdAt,
    Date updatedAt) {
    
    public static TaskResponse from(Task task) {
        return new TaskResponse(
            task.getTaskId(),
            task.getTitle(),
            task.getDescription(),
            task.getImage(),
            task.getLink(),
            task.getCreatedAt(),
            task.getUpdatedAt()
        );
    }
}
