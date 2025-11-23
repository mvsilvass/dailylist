package com.mvsilvass.dailylist.controller;

import com.mvsilvass.dailylist.model.User;
import com.mvsilvass.dailylist.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
public class AdminController {
    
    private final AdminService adminService;
    
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }
    
    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(adminService.getUserById(id));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id){
        adminService.deleteUserById(id);
        return ResponseEntity.ok("Usuário deletado com sucesso");
    }
}
