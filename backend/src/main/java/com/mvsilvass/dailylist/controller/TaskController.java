package com.mvsilvass.dailylist.controller;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users/tasks")
public class TaskController {
    
    private final TaskService taskService;
    private final UserRepository userRepository;
    
    public TaskController(TaskService taskService, UserRepository userRepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
    }
    
    @PostMapping()
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest taskRequest, JwtAuthenticationToken token){
        User user = userRepository.findByEmail(token.getName())
            .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        
        Task task = taskService.createTask(user, taskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(TaskResponse.from(task));
    }
    
    
    
}
