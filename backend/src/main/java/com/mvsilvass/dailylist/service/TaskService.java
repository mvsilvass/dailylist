package com.mvsilvass.dailylist.service;

import org.springframework.stereotype.Service;

import com.mvsilvass.dailylist.excepiton.ForbiddenException;
import com.mvsilvass.dailylist.excepiton.TaskNotFoundException;

import com.mvsilvass.dailylist.repository.TaskRepository;

import com.mvsilvass.dailylist.dto.request.TaskPositionRequest;
import com.mvsilvass.dailylist.dto.request.TaskRequest;

import com.mvsilvass.dailylist.model.Task;
import com.mvsilvass.dailylist.model.User;

import java.util.List;

@Service
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    
    public List<Task> getAllTasks(Long userId){
        return taskRepository.findAllByUser_UserId(userId);
    }
    
    public Task createTask(User user, TaskRequest taskRequest){
        Task task = new Task();
        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());
        task.setImage(taskRequest.image());
        task.setTargetDate(taskRequest.targetDate());
        task.setLink(taskRequest.link());
        task.setPriority(1);
        task.setDone(false);
        task.setUser(user);
        
        return taskRepository.save(task);
    }
    
    public Task getTaskById(Long taskId, User user){
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new TaskNotFoundException("Tarefa com id "+ taskId + " não encontrada"));
        
        if(!task.getUser().getUserId().equals(user.getUserId())){
            throw new ForbiddenException("Você não tem permissão para acessar essa tarefa");
        }
        
        return task;
    }
    
    public Task updateTaskById(Long taskId, TaskRequest updatedTask, User user){
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new TaskNotFoundException("Tarefa com id "+ taskId + " não encontrada"));
        
        if(!task.getUser().getUserId().equals(user.getUserId())){
            throw new ForbiddenException("Você não tem permissão para acessar essa tarefa");
        }
        
        task.setTitle(updatedTask.title());
        task.setDescription(updatedTask.description());
        task.setTargetDate(updatedTask.targetDate());
        task.setImage(updatedTask.image());
        task.setLink(updatedTask.link());
        task.setPriority(updatedTask.priority());
        task.setDone(updatedTask.isDone());
        taskRepository.save(task);
        
        return task;
    }
    
    public void reorderTasks(List<TaskPositionRequest> updateTasks, User user) {
        updateTasks.forEach(updatedTask -> {
            Long taskId = updatedTask.id();
            
            Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Tarefa com id " + taskId + " não encontrada"));
            
            if (!task.getUser().getUserId().equals(user.getUserId())) {
                throw new ForbiddenException("Você não tem permissão para acessar essa tarefa");
            }
            
            task.setPriority(updatedTask.priority());
            task.setTargetDate(updatedTask.targetDate());
            taskRepository.save(task);
        });
    }
}
