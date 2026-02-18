package com.mvsilvass.dailylist.dto.response;

import com.mvsilvass.dailylist.model.Task;

import java.util.Date;

public record TaskResponse(
    Long id,
    String title,
    String description,
    String link,
    int priority,
    Date targetDate,
    Date createdAt,
    Date updatedAt,
    boolean isDone
) {
    public static TaskResponse from(Task task) {
        return new TaskResponse(
            task.getTaskId(),
            task.getTitle(),
            task.getDescription(),
            task.getLink(),
            task.getPriority(),
            task.getTargetDate(),
            task.getCreatedAt(),
            task.getUpdatedAt(),
            task.isDone()
        );
    }
}
