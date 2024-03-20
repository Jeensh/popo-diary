package com.poscodx.main.controller;

import com.poscodx.main.model.UserDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/diary/")
public class DiaryController {
    @GetMapping("test")
    public String test(Authentication auth) {
        UserDTO userDTO = (UserDTO) auth.getPrincipal();
        System.out.println(userDTO);

        return "성공";
    }
}
