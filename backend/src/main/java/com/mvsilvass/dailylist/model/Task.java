package com.mvsilvass.dailylist.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @Column(name = "task_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;
    
    @Column(name = "updated_at")
    @UpdateTimestamp
    private Date UpdateAt;
    
}
