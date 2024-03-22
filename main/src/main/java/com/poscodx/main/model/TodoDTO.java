package com.poscodx.main.model;

import lombok.Data;

@Data
public class TodoDTO {
    private Long id;
    private String content;
    private Integer state;  // 1:시작 전, 2:진행 중, 3:완료
    private DiaryDTO diary;
}