package com.poscodx.diary.service;

import com.poscodx.diary.model.Diary;
import com.poscodx.diary.model.Todo;
import com.poscodx.diary.model.dto.DiaryDTO;
import com.poscodx.diary.model.dto.TodoDTO;
import com.poscodx.diary.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiaryService {
    private final DiaryRepository diaryRepository;

    @Transactional
    public void write(DiaryDTO diaryDTO){
        Diary diary = new Diary();
        diary.setEntity(diaryDTO);
        diaryRepository.save(diary);
    }

    @Transactional
    public void delete(Long diaryId){
        diaryRepository.deleteDiaryById(diaryId);
    }

    @Transactional
    public void updateForRef(DiaryDTO diaryDTO){
        Diary diary = diaryRepository.findDiaryById(diaryDTO.getId());
        diary.setTitle(diaryDTO.getTitle());
        diary.setContent(diaryDTO.getContent());
        diaryRepository.save(diary);
    }

    @Transactional
    public void refUpdate(DiaryDTO diaryDTO){
        Diary diary = diaryRepository.findDiaryById(diaryDTO.getId());
        diary.setContent(diaryDTO.getContent());
        diaryRepository.save(diary);
    }

    @Transactional
    public void update(DiaryDTO diaryDTO){
        Diary diary = diaryRepository.findDiaryById(diaryDTO.getId());
        diary.setTitle(diaryDTO.getTitle());
        diary.setContent(diaryDTO.getContent());
        diary.setFriendName(diaryDTO.getFriendName());

        diary.getTodoList().clear();

        diaryDTO.getTodoList().forEach(dto -> {
            Todo todo = new Todo();
            todo.setEntity(dto);
            todo.setDiary(diary);
            diary.getTodoList().add(todo);
        });

        diaryRepository.save(diary);
    }


    public Page<DiaryDTO> findByFriendName(String friendName, Pageable pageable){
        return diaryRepository.findDiariesByFriendName(friendName, pageable).map(diary -> {
            DiaryDTO dto = new DiaryDTO();
            dto.setDto(diary);
            return dto;
        });
    }

    public List<DiaryDTO> findByUserAndDate(String username, Integer year, Integer month){
        List<DiaryDTO> diaryDTOList = new LinkedList<>();
        Integer lastYear = month > 1 ? year : year - 1;
        Integer nextYear = month < 12 ? year : year + 1;
        Integer lastMonth = month > 1 ? month - 1 : 12;
        Integer nextMonth = month < 12 ? month + 1 : 1;

        diaryDTOList.addAll(diaryRepository.findDiariesBetweenYearsAndMonths(lastYear, lastMonth, nextYear, nextMonth, username)
                .stream().map(diary -> {
                    DiaryDTO dto = new DiaryDTO();
                    dto.setDto(diary);
                    return dto;
                }).toList());
        return diaryDTOList;
    }

    public DiaryDTO findByDate(String username, Integer year, Integer month, Integer day){
        DiaryDTO dto = new DiaryDTO();
        dto.setDto(diaryRepository.findDiaryByYearAndMonthAndDayAndUserId(year, month, day, username));
        return dto;
    }

    public DiaryDTO findByDate(Date date){
        DiaryDTO dto = new DiaryDTO();
        Diary diary = diaryRepository.findDiaryByDate(date);
        dto.setDto(diary);
        return dto;
    }

    public DiaryDTO findById(Long id){
        DiaryDTO dto = new DiaryDTO();
        Diary diary = diaryRepository.findDiaryById(id);
        dto.setDto(diary);
        return dto;
    }
}
