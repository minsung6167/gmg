package com.gmg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;

    private String name;

    @Column(unique = true, nullable = false)
    private String userId;

    private String password;

    private String phone;

    private String email;

    protected User() {
    }

    public User(String name, String userId, String password, String phone, String email) {
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.phone = phone;
        this.email = email;
    }

    public Long getNo() {
        return no;
    }

    public String getName() {
        return name;
    }

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }
}
