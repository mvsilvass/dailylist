package com.mvsilvass.dailylist.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @Column(name = "task_id")
    private Long taskId;

    @Setter
    @Column(nullable = false)
    private String title;

    @Lob
    @Setter
    private String description;

    @Lob
    @Setter
    private byte[] image;

    @Setter
    private String link;

    @ManyToOne
    @Column(nullable = false)
    private User user;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

}
