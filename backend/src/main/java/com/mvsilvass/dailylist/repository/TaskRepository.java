package com.mvsilvass.dailylist.repository;

import com.mvsilvass.dailylist.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUser_UserId(Long userId);
}
