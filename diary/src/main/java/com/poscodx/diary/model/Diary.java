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
    @Column(name = "friend_id")
    private Long friendId;
    private Long userId;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "diary")
    List<Todo> todoList = new LinkedList<>();



    public void setEntity(DiaryDTO dto){
        id = dto.getId();
        title = dto.getTitle();
        content = dto.getContent();
        date = dto.getDate();
        friendId = dto.getFriendId();
        userId = dto.getUserId();
    }
}