package com.poscodx.diary.controller;

import com.poscodx.diary.model.Diary;
import com.poscodx.diary.model.Todo;
import com.poscodx.diary.model.dto.DiaryDTO;
import com.poscodx.diary.model.dto.ResponseDTO;
import com.poscodx.diary.model.dto.TodoDTO;
import com.poscodx.diary.service.DiaryService;
import com.poscodx.diary.service.TodoService;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.message.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diary/")
public class DiaryController {
    private final DiaryService diaryService;
    private final TodoService todoService;
    private static final Integer PAGE_SIZE = 10;
    private static final Integer PAGE_SPAN = 1;

    // 공유받은 일기 조회
    @PostMapping("ref")
    public ResponseDTO getRefDiaries(String friendName, @RequestParam(defaultValue = "0") Integer pageNumber){
        ResponseDTO res = new ResponseDTO();

        if (pageNumber <= 0) pageNumber = 1;
        PageRequest page = PageRequest.of(pageNumber - 1, PAGE_SIZE);

        Page<DiaryDTO> diaryPage = diaryService.findByFriendName(friendName, page);
        int totalPage = diaryPage.getTotalPages();
//        int startPage = (((pageNumber - 1) / PAGE_SIZE) * 2) + 1;
        int startPage = Math.max(pageNumber - PAGE_SPAN, 1);
//        int endPage = Math.min(startPage + PAGE_SIZE - 1, totalPage);
        int endPage = Math.min(pageNumber + PAGE_SPAN, totalPage);

        Map<String, Object> map = new HashMap<>();
        map.put("startPage", startPage);
        map.put("endPage", endPage);
        map.put("totalPage", totalPage);
        map.put("diaryList", diaryPage.getContent());

        res.setSuccess(true);
        res.setData(map);
        res.setMessage("성공");
        return res;
    }

    // 일기 조회(년도, 월, 일, 유저아이디)
    @PostMapping("{year}/{month}/{day}")
    public ResponseDTO getDiaryByDate(String username, @PathVariable Integer year, @PathVariable Integer month, @PathVariable Integer day){
        ResponseDTO res = new ResponseDTO();
        DiaryDTO diaryDTO = diaryService.findByDate(username, year, month, day);
        res.setSuccess(true);
        res.setData(diaryDTO);
        res.setMessage("성공");
        return res;
    }

    // 일기 목록 조회(년도, 월, 유저아이디)
    @PostMapping("{year}/{month}")
    public ResponseDTO getDiariesByDate(String username, @PathVariable Integer year, @PathVariable Integer month){
        ResponseDTO res = new ResponseDTO();
        List<DiaryDTO> diaryDTOList = diaryService.findByUserAndDate(username, year, month);

        res.setData(diaryDTOList);
        res.setSuccess(true);
        res.setMessage("성공");
        return res;
    }

    // 일기 삭제
    @PostMapping("delete")
    public ResponseDTO delete(DiaryDTO diaryDTO){
        ResponseDTO res = new ResponseDTO();

        diaryService.delete(diaryDTO.getId());
        res.setSuccess(true);
        res.setMessage("다이어리 삭제 성공!");
        diaryService.update(diaryDTO);
        return res;
    }

    /**
     * 일기 수정 (friend 용)
     * - diary 정보를 받아서 저장
     */
    @PostMapping("ref/update")
    public ResponseDTO updateRef(DiaryDTO diaryDTO){
        ResponseDTO res = new ResponseDTO();
        StringBuilder message = new StringBuilder();

        diaryValidation(diaryDTO, message);
        if(message.isEmpty()){
            diaryService.refUpdate(diaryDTO);
            res.setSuccess(true);
            res.setMessage("다이어리 수정 성공!");
        }
        return res;
    }


    // 일기 수정
    @PostMapping("update")
    public ResponseDTO update(@RequestBody DiaryDTO diaryDTO) {
        ResponseDTO res = new ResponseDTO();
        StringBuilder message = new StringBuilder();

        diaryValidation(diaryDTO, message);
        todoValidation(diaryDTO.getTodoList(), message);
        if(message.isEmpty()){
            diaryService.update(diaryDTO);
            res.setSuccess(true);
            res.setMessage("다이어리 수정 성공!");
        }
        return res;
    }

    /**
     * 일기 쓰기 (owner 용)
     * - diary 정보와 Todo List를 받아서 일괄 저장
     */
    @PostMapping("write")
    public ResponseDTO write(@RequestBody DiaryDTO diaryDTO) {
        ResponseDTO res = new ResponseDTO();
        StringBuilder message = new StringBuilder();

        System.out.println(diaryDTO);

        diaryValidation(diaryDTO, message);
        todoValidation(diaryDTO.getTodoList(), message);
        if(message.isEmpty()){
            res.setSuccess(true);
            res.setMessage("다이어리 저장 성공!");
            diaryDTO.setTodoList(diaryDTO.getTodoList());
            diaryService.write(diaryDTO);
        }
        return res;
    }

    // 다이어리 입력 값 검증
    private void diaryValidation(DiaryDTO diaryDTO, StringBuilder message){
    }

    // Todo 입력 값 검증
    private void todoValidation(List<TodoDTO> todoDTOList, StringBuilder message){
    }
}
