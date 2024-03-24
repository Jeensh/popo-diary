package com.poscodx.main.model;

import lombok.Data;

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
}