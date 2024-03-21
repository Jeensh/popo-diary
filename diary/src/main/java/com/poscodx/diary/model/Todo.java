package com.poscodx.diary.model;

import com.poscodx.diary.model.dto.TodoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Integer state;  // 1:시작 전, 2:진행 중, 3:완료

    @ManyToOne
    @JoinColumn(name = "diary_id")
    private Diary diary;



    public void setEntity(TodoDTO dto){
        id = dto.getId();
        content = dto.getContent();
        state = dto.getState();
    }
}