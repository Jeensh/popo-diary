package com.poscodx.diary.repository;

import com.poscodx.diary.model.Diary;
import com.poscodx.diary.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    Todo findTodoById(Long id);
    List<Todo> findTodosByDiary(Diary diary);
    void deleteTodoById(Long id);
}