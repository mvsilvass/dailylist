package com.mvsilvass.dailylist.controller;

import com.mvsilvass.dailylist.dto.request.TaskPositionRequest;
import com.mvsilvass.dailylist.dto.request.TaskRequest;
import com.mvsilvass.dailylist.dto.response.TaskResponse;
import com.mvsilvass.dailylist.excepiton.UserNotFoundException;
import com.mvsilvass.dailylist.model.Task;
import com.mvsilvass.dailylist.model.User;
import com.mvsilvass.dailylist.repository.UserRepository;
import com.mvsilvass.dailylist.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    
    private final TaskService taskService;
    private final UserRepository userRepository;
    
    public TaskController(TaskService taskService, UserRepository userRepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
    }
    
    @GetMapping()
    public ResponseEntity<List<TaskResponse>> getAllTasks(JwtAuthenticationToken token){
        Long userId = Long.parseLong(token.getName());
        
        List<Task> tasks = taskService.getAllTasks(userId);
        List<TaskResponse> response = tasks.stream()
            .map(TaskResponse::from)
            .toList();
        
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @PostMapping()
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest taskRequest, JwtAuthenticationToken token){
        Long userId = Long.parseLong(token.getName());
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        
        Task task = taskService.createTask(user, taskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(TaskResponse.from(task));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTaskById(@PathVariable Long id,
                                                       @Valid @RequestBody TaskRequest taskRequest,
                                                       JwtAuthenticationToken token){
        Long userId = Long.parseLong(token.getName());
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        
        Task task = taskService.updateTaskById(id, taskRequest, user);
        return ResponseEntity.status(HttpStatus.OK).body(TaskResponse.from(task));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id, JwtAuthenticationToken token){
        Long userId = Long.parseLong(token.getName());
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        
        Task task = taskService.getTaskById(id, user);
        return ResponseEntity.status(HttpStatus.OK).body(TaskResponse.from(task));
    }
    
    @PutMapping("/reorder")
    public ResponseEntity<Void> reorderTasks(@RequestBody List<TaskPositionRequest> updateTasks, JwtAuthenticationToken token) {
        Long userId = Long.parseLong(token.getName());
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        
        taskService.reorderTasks(updateTasks, user);
        
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
