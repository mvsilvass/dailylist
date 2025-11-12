package com.mvsilvass.dailylist.repository;

import com.mvsilvass.dailylist.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Long, User>{
}
