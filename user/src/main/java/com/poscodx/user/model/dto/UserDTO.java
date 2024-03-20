package com.poscodx.user.model.dto;

import com.poscodx.user.model.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String name;

    public void setDTO(User user) {
        id = user.getId();
        username = user.getUsername();
        password = user.getPassword();
        name = user.getName();
    }
}
