package com.poscodx.user.model;

import com.poscodx.user.model.dto.UserDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
//@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;

    public void setEntity(UserDTO dto){
        id = dto.getId();
        username = dto.getUsername();
        password = dto.getPassword();
        name = dto.getName();
    }
}