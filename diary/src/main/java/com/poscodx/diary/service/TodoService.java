package com.poscodx.diary.service;

import com.poscodx.diary.model.Diary;
import com.poscodx.diary.model.Todo;
import com.poscodx.diary.model.dto.DiaryDTO;
import com.poscodx.diary.model.dto.TodoDTO;
import com.poscodx.diary.repository.DiaryRepository;
import com.poscodx.diary.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoService {
    private final TodoRepository todoRepository;
    private final DiaryRepository diaryRepository;

    public Page<TodoDTO> findByStateAndUsername(Integer state, String userName, Pageable pageable){
        return todoRepository.findTodosByStateAndUsernameOrderByIdDesc(state, userName, pageable)
                .map(todo -> {
                    TodoDTO dto = new TodoDTO();
                    dto.setDto(todo);
                    return dto;
                });
    }

    @Transactional
    public void updateTodos(List<TodoDTO> todoDTOList){
        System.out.println(todoDTOList);
        for(TodoDTO dto : todoDTOList){
            if(dto.getState() == 4){
                todoRepository.deleteTodoById(dto.getId());
            }
            else{
                Todo todo = todoRepository.findTodoById(dto.getId());
                todo.setState(dto.getState());
                todoRepository.save(todo);
            }
        }
    }

    @Transactional
    public void write(TodoDTO todoDTO){
        Todo todo = new Todo();
        todo.setEntity(todoDTO);
        todoRepository.save(todo);
    }

    @Transactional
    public void delete(Long todoId){
        todoRepository.deleteTodoById(todoId);
    }

    @Transactional
    public void update(TodoDTO todoDTO){
        Todo todo = todoRepository.findTodoById(todoDTO.getId());
        if(todoDTO.getContent() != null)
            todo.setContent(todoDTO.getContent());
        if(todoDTO.getState() != null)
            todo.setState(todoDTO.getState());
        todoRepository.save(todo);
    }

    public List<TodoDTO> findByDiaryId(Long diaryId){
        Diary diary = diaryRepository.findDiaryById(diaryId);
        return todoRepository.findTodosByDiary(diary)
                .stream().map(todo -> {
                    TodoDTO dto = new TodoDTO();
                    dto.setDto(todo);
                    return dto;
                }).toList();
    }

    public TodoDTO findById(Long id){
        TodoDTO dto = new TodoDTO();
        Todo todo = todoRepository.findTodoById(id);
        dto.setDto(todo);
        return dto;
    }
}
