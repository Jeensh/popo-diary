package com.poscodx.diary.controller;

import com.poscodx.diary.model.Todo;
import com.poscodx.diary.model.dto.DiaryDTO;
import com.poscodx.diary.model.dto.ResponseDTO;
import com.poscodx.diary.model.dto.TodoDTO;
import com.poscodx.diary.service.DiaryService;
import com.poscodx.diary.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todo/")
public class TodoController {
    private final TodoService todoService;
    private static final Integer PAGE_SIZE = 10;
    private static final Integer PAGE_SPAN = 1;

    // 공유받은 일기 조회
    @PostMapping("{state}/{pageNumber}")
    public ResponseDTO getRefDiaries(String userName, @RequestParam(defaultValue = "0") Integer state, @RequestParam(defaultValue = "0") Integer pageNumber){
        ResponseDTO res = new ResponseDTO();

        if (pageNumber <= 0) pageNumber = 1;
        PageRequest page = PageRequest.of(pageNumber - 1, PAGE_SIZE);

        Page<TodoDTO> todoPage = todoService.findByStateAndUsername(state, userName, page);
        int totalPage = todoPage.getTotalPages();
        int startPage = Math.max(pageNumber - PAGE_SPAN, 1);
        int endPage = Math.min(pageNumber + PAGE_SPAN, totalPage);

        Map<String, Object> map = new HashMap<>();
        map.put("startPage", startPage);
        map.put("endPage", endPage);
        map.put("totalPage", totalPage);
        map.put("todoList", todoPage.getContent());

        res.setSuccess(true);
        res.setData(map);
        res.setMessage("성공");
        return res;
    }
}
