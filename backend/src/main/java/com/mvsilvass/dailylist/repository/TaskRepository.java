package com.mvsilvass.dailylist.repository;

import com.mvsilvass.dailylist.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Long, Task> {
}
