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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // 일기 조회(년도, 월, 일, 유저아이디)
    @PostMapping("{year}/{month}/{day}")
    public ResponseDTO getDiaryId(Long userId, @PathVariable Integer year, @PathVariable Integer month, @PathVariable Integer day){
        ResponseDTO res = new ResponseDTO();
        DiaryDTO diaryDTO = diaryService.findByDate(userId, year, month, day);
        res.setSuccess(true);
        res.setData(diaryDTO);
        res.setMessage("성공");
        return res;
    }

    // 일기 목록 조회(년도, 월, 유저아이디)
    @PostMapping("{year}/{month}")
    public ResponseDTO getDiariesByDate(Long userId, @PathVariable Integer year, @PathVariable Integer month){
        ResponseDTO res = new ResponseDTO();
        List<DiaryDTO> diaryDTOList = diaryService.findByUserAndDate(userId, year, month);

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
    @PostMapping("update-ref")
    public ResponseDTO updateRef(DiaryDTO diaryDTO){
        ResponseDTO res = new ResponseDTO();
        StringBuilder message = new StringBuilder();

        diaryValidation(diaryDTO, message);
        if(message.isEmpty()){
            res.setSuccess(true);
            res.setMessage("다이어리 수정 성공!");
            diaryService.update(diaryDTO);
        }
        return res;
    }


    // 일기 수정
    @PostMapping("update")
    public ResponseDTO update(DiaryDTO diaryDTO) {
        ResponseDTO res = new ResponseDTO();
        StringBuilder message = new StringBuilder();

        diaryValidation(diaryDTO, message);
        todoValidation(diaryDTO.getTodoList(), message);
        if(message.isEmpty()){
            res.setSuccess(true);
            res.setMessage("다이어리 수정 성공!");
            diaryDTO.setTodoList(diaryDTO.getTodoList());
            diaryService.update(diaryDTO);
        }
        return res;
    }

    /**
     * 일기 쓰기 (owner 용)
     * - diary 정보와 Todo List를 받아서 일괄 저장
     */
    @PostMapping("write")
    public ResponseDTO write(DiaryDTO diaryDTO) {
        ResponseDTO res = new ResponseDTO();
        StringBuilder message = new StringBuilder();

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
