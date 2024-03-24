package com.poscodx.diary.model;

import com.poscodx.diary.model.dto.DiaryDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "diary")
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private Date date;
    @Column(name = "friend_name")
    private String friendName;
    private String username;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "diary", orphanRemoval = true)
    List<Todo> todoList = new LinkedList<>();



    public void setEntity(DiaryDTO dto){
        id = dto.getId();
        title = dto.getTitle();
        content = dto.getContent();
        date = dto.getDate();
        friendName = dto.getFriendName();
        username = dto.getUsername();
        todoList = dto.getTodoList().stream().map(todoDTO -> {
            Todo todo = new Todo();
            todo.setEntity(todoDTO);
            todo.setDiary(this);
            return todo;
        }).toList();
    }
}