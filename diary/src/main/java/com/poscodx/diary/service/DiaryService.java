package com.poscodx.diary.service;

import com.poscodx.diary.model.Diary;
import com.poscodx.diary.model.dto.DiaryDTO;
import com.poscodx.diary.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
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
    public void update(DiaryDTO diaryDTO){
        Diary diary = diaryRepository.findDiaryById(diaryDTO.getId());
        diary.setTitle(diaryDTO.getTitle());
        diary.setContent(diaryDTO.getContent());
        diary.setFriendId(diaryDTO.getFriendId());
        diaryRepository.save(diary);
    }



    public List<DiaryDTO> findByUserAndDate(Long userId, Integer year, Integer month){
        return diaryRepository.findDiariesByYearAndMonthAndUserId(year, month, userId)
                .stream().map(diary -> {
                    DiaryDTO dto = new DiaryDTO();
                    dto.setDto(diary);
                    return dto;
                }).toList();
    }

    public DiaryDTO findByDate(Long userId, Integer year, Integer month, Integer day){
        DiaryDTO dto = new DiaryDTO();
        dto.setDto(diaryRepository.findDiaryByYearAndMonthAndDayAndUserId(year, month, day, userId));
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