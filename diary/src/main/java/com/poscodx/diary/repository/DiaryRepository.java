package com.poscodx.diary.repository;

import com.poscodx.diary.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Diary findDiaryById(Long id);
    Diary findDiaryByDate(Date date);
    List<Diary> findDiariesByDate_MonthAndUserId(Integer month, Long userId);
    void deleteDiaryById(Long id);
}