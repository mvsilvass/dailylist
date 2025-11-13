package com.mvsilvass.dailylist.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Setter
    @Column(nullable = false, unique = true)
    private String name;

    public enum Values{
        ADMIN(1L),
        BASIC(2L);

        @Getter
        private final long roleId;

        Values(long roleId){
            this.roleId = roleId;
        }
    }
}
