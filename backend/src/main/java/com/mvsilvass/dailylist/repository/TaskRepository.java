package com.mvsilvass.dailylist.repositories;

import com.mvsilvass.dailylist.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Long, Task> {
}
