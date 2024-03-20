package com.poscodx.main.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/diary/")
public class DiaryController {
    @GetMapping("test")
    public String test() {
        return "성공";
    }
}
