package com.poscodx.main.controller;

import com.poscodx.main.model.ResponseDTO;
import com.poscodx.main.model.UserDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/")
public class UserController {

    private final String USER_SERVER = "http://popo-diary-user:8085";
    private final BCryptPasswordEncoder ENCODER;


    //TODO : 로그인 입력 값 검증
    @PostMapping("login")
    public ResponseDTO auth(@RequestParam String username, @RequestParam String password) {
        ResponseDTO res = new ResponseDTO();

        MultiValueMap<String, String> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("username", username);
        paramMap.add("password", password);
        String url = USER_SERVER + "/login";
        ResponseEntity<UserDTO> responseEntity =
                new RestTemplate().postForEntity(url, paramMap, UserDTO.class);

        UserDTO userDTO = responseEntity.getBody();
        if (userDTO != null && userDTO.getId() != null) {
            res.setSuccess(true);
            res.setData(userDTO);
        }

        return res;
    }

    @PostMapping("logout")
    public ResponseDTO logout() {
        ResponseDTO res = new ResponseDTO();
        SecurityContextHolder.getContext().setAuthentication(null);

        res.setSuccess(true);
        res.setData("로그아웃 완료");
        return res;
    }

    @PostMapping("register")
    public ResponseDTO register(UserDTO userDTO) {
        ResponseDTO res = new ResponseDTO();
        String password = userDTO.getPassword();

        MultiValueMap<String, String> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("username", userDTO.getUsername());
        if(password == null || password.isEmpty())
            password = "";
        else
            password = ENCODER.encode(userDTO.getPassword());
        paramMap.add("password", password);
        paramMap.add("name", userDTO.getName());
        String url = USER_SERVER + "/register";
        ResponseEntity<ResponseDTO> responseEntity =
                new RestTemplate().postForEntity(url, paramMap, ResponseDTO.class);

        ResponseDTO response = responseEntity.getBody();
        res.setMessage(response.getMessage());
        if (response.getSuccess()) {
            res.setMessage("회원가입 성공");
            res.setSuccess(true);
        }

        return res;
    }

    @PostMapping("success")
    public ResponseDTO loginSuccess(){
        ResponseDTO res = new ResponseDTO();
        res.setSuccess(true);
        res.setMessage("로그인 성공");
        return res;
    }

    @PostMapping("fail")
    public ResponseDTO loginFail(){
        ResponseDTO res = new ResponseDTO();
        res.setSuccess(false);
        res.setMessage("로그인 실패");
        return res;
    }
}
