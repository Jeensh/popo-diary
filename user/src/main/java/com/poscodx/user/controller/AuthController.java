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
        res.setMessage(registerValidation(userDTO));
        if(res.getMessage().equals(""))
            res.setSuccess(true);

        if(res.getSuccess()) {
            authService.register(userDTO);
            res.setSuccess(true);
            res.setMessage("회원가입 성공!");
        }
        return res;
    }

    private String registerValidation(UserDTO userDTO){
        StringBuilder message = new StringBuilder("");
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        String name = userDTO.getName();

        // 입력 검증, 아이디, 비번, 닉네임
        if(username == null || username.isBlank()){
            message.append("아이디를 입력해주세요!").append("\n");
        }
        if(password == null || password.isBlank()){
            message.append("패스워드를 입력해주세요!").append("\n");
        }
        if(name == null || name.isBlank()){
            message.append("이름을 입력해주세요!").append("\n");
        }

        // 아이디 중복 검증
        UserDTO user = authService.findByUsername(username);
        if(user.getId() != null){
            message.append("중복된 아이디입니다!").append("\n");
        }
        return message.toString();
    }
}
