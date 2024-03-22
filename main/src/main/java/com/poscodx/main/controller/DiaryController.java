package com.poscodx.main.controller;

import com.poscodx.main.model.DiaryDTO;
import com.poscodx.main.model.ResponseDTO;
import com.poscodx.main.model.TodoDTO;
import com.poscodx.main.model.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/diary/")
public class DiaryController {

    private final String DIARY_SERVER = "http://localhost:8090";

    @GetMapping("test")
    public String test(Authentication auth) {
        UserDTO userDTO = (UserDTO) auth.getPrincipal();
        System.out.println(userDTO);

        return "성공";
    }

    @PostMapping("save")
    public ResponseDTO save(DiaryDTO diary, List<TodoDTO> todoList){
        ResponseDTO res = new ResponseDTO();

        diary.setTodoList(todoList);

        String url = DIARY_SERVER + "/diary/write";
        if(diary.getId() == null) url = DIARY_SERVER + "/diary/update";
        ResponseEntity<ResponseDTO> responseEntity =
                new RestTemplate().postForEntity(url, diary, ResponseDTO.class);

        ResponseDTO response = responseEntity.getBody();
        res.setMessage(response.getMessage());
        if (response.getSuccess()) {
            res.setMessage("다이어리 저장 성공!");
            res.setSuccess(true);
        }

        return res;
    }
}
