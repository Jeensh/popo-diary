package com.poscodx.main.controller;

import com.poscodx.main.model.DiaryDTO;
import com.poscodx.main.model.ResponseDTO;
import com.poscodx.main.model.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/todo/")
public class TodoController {

    private final String DIARY_SERVER = "http://localhost:8090";

    // 내 Todo 목록 조회
    @PostMapping("{state}/{pageNumber}")
    public ResponseDTO getRefDiaries(Authentication auth, @PathVariable Integer pageNumber, @PathVariable Integer state){
        UserDTO login = (UserDTO) auth.getPrincipal();
        ResponseDTO res = new ResponseDTO();

        MultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("userName", login.getUsername());
        paramMap.add("pageNumber", pageNumber);
        paramMap.add("state", state);
        String url = DIARY_SERVER + "/todo/" + state + "/" + pageNumber;
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
}
