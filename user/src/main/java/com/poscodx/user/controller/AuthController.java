package com.poscodx.user.controller;

import com.poscodx.user.model.dto.ResponseDTO;
import com.poscodx.user.model.dto.UserDTO;
import com.poscodx.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public UserDTO login(UserDTO userDTO){
        return authService.login(userDTO.getUsername(), userDTO.getPassword());
    }

    @PostMapping("/auth")
    public UserDTO auth(UserDTO userDTO){
        return authService.findByUsername(userDTO.getUsername());
    }

    @PostMapping("/register")
    public ResponseDTO register(UserDTO userDTO){
        ResponseDTO res = new ResponseDTO();

        authService.register(userDTO);

        res.setSuccess(true);
        res.setMessage("회원가입 성공!");
        return res;
    }
}
