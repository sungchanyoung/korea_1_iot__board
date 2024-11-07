package com.korit.board_back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(nullable = false, unique = true)
    private  String userId;

    @Column(nullable = false)
    private  String password;

    @Column(nullable = false, unique = true)
    private  String email;

    @Column(nullable = false)
    private  String name;

    @Column(nullable = false)
    private  String phone;

    @Column(columnDefinition = "ENUM('M','F')")
    private  String gender;
}
