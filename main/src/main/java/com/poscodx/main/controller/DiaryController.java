package com.poscodx.main.controller;

import com.poscodx.main.model.DiaryDTO;
import com.poscodx.main.model.ResponseDTO;
import com.poscodx.main.model.TodoDTO;
import com.poscodx.main.model.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/diary/")
public class DiaryController {

    private final String DIARY_SERVER = "http://popo-diary-diary:8090";

    // 공유받은 일기 목록 조회
    @PostMapping("ref/{pageNumber}")
    public ResponseDTO getRefDiaries(Authentication auth, @PathVariable Integer pageNumber){
        UserDTO login = (UserDTO) auth.getPrincipal();
        ResponseDTO res = new ResponseDTO();

        MultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("friendName", login.getUsername());
        paramMap.add("pageNumber", pageNumber);
        String url = DIARY_SERVER + "/diary/ref";
        ResponseEntity<ResponseDTO> responseEntity =
                new RestTemplate().postForEntity(url, paramMap, ResponseDTO.class);

        ResponseDTO response = responseEntity.getBody();
        if(response == null) {
            res.setSuccess(false);
            return res;
        }
        res = response;
        return res;
    }

    // 일기 목록 조회(년도, 월, 유저아이디)
    @PostMapping("{year}/{month}")
    public ResponseDTO getDiariesByDate(Authentication auth, @PathVariable Integer year, @PathVariable Integer month){
        UserDTO login = (UserDTO) auth.getPrincipal();
        ResponseDTO res = new ResponseDTO();

        MultiValueMap<String, String> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("username", login.getUsername());
        String url = DIARY_SERVER + "/diary/" + year + "/" + month;
        ResponseEntity<ResponseDTO> responseEntity =
                new RestTemplate().postForEntity(url, paramMap, ResponseDTO.class);

        ResponseDTO response = responseEntity.getBody();
        if(response == null) {
            res.setSuccess(false);
            return res;
        }
        res = response;
        return res;
    }

    @PostMapping("ref/update")
    public ResponseDTO refUpdate(Authentication auth, @RequestBody DiaryDTO diary){
        UserDTO login = (UserDTO) auth.getPrincipal();
        ResponseDTO res = new ResponseDTO();
        if(login == null || login.getId() == null || !login.getUsername().equals(diary.getFriendName())){
            res.setMessage("사용자 인증 실패!");
            return res;
        }
        String url = DIARY_SERVER + "/ref/update";
        ResponseEntity<ResponseDTO> responseEntity =
                new RestTemplate().postForEntity(url, diary, ResponseDTO.class);

        ResponseDTO response = responseEntity.getBody();
        res.setMessage(response.getMessage());
        if (response.getSuccess()) {
            res.setMessage("친구 다이어리 수정 성공!");
            res.setSuccess(true);
        }

        return res;
    }

    @PostMapping("save")
    public ResponseDTO save(Authentication auth, @RequestBody DiaryDTO diary){
        UserDTO login = (UserDTO) auth.getPrincipal();
        ResponseDTO res = new ResponseDTO();
        if(login == null || login.getId() == null){
            res.setMessage("사용자 인증 실패!");
            return res;
        }

        diary.getTodoList().forEach(todo -> todo.setUsername(login.getUsername()));

        diary.setTodoList(diary.getTodoList());
        diary.setUsername(login.getUsername());

        String url = DIARY_SERVER + "/diary/update";
        if(diary.getId() == null || diary.getId() == 0) url = DIARY_SERVER + "/diary/write";
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
