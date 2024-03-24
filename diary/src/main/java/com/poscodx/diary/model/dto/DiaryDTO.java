package com.poscodx.diary.model.dto;

import com.poscodx.diary.model.Diary;
import com.poscodx.diary.model.Todo;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

@Data
public class DiaryDTO {
    private Long id;
    private String title;
    private String content;
    private Date date;
    private String friendName;
    private String username;

    List<TodoDTO> todoList = new LinkedList<>();



    public void setDto(Diary diary){
        id = diary.getId();
        title = diary.getTitle();
        content = diary.getContent();
        date = diary.getDate();
        friendName = diary.getFriendName();
        username = diary.getUsername();
        if(diary.getTodoList() != null && !diary.getTodoList().isEmpty())
            todoList = diary.getTodoList().stream().map(todo -> {
                TodoDTO dto = new TodoDTO();
                dto.setDto(todo);
                return dto;
            }).toList();
    }
}