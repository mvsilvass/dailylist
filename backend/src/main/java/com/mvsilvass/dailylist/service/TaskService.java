package com.mvsilvass.dailylist.service;

import com.mvsilvass.dailylist.dto.request.TaskRequest;
import com.mvsilvass.dailylist.model.Task;
import com.mvsilvass.dailylist.model.User;
import com.mvsilvass.dailylist.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    
    public final TaskRepository taskRepository;
    
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    
    public Task create(User user, TaskRequest taskRequest){
        Task task = new Task();
        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());
        task.setImage(taskRequest.image());
        task.setLink(taskRequest.link());
        task.setUser(user);
        
        return taskRepository.save(task);
    }
}
