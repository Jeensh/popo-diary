package com.poscodx.diary.model.dto;

import com.poscodx.diary.model.Diary;
import com.poscodx.diary.model.Todo;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class TodoDTO {
    private Long id;
    private String content;
    private Integer state;  // 1:시작 전, 2:진행 중, 3:완료
    private DiaryDTO diary;
    private String username;



    public void setDto(Todo todo){
        id = todo.getId();
        content = todo.getContent();
        state = todo.getState();
        username = todo.getUsername();
    }
}