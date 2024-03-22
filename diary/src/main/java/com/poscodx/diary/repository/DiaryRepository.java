package com.poscodx.diary.repository;

import com.poscodx.diary.model.Diary;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Diary findDiaryById(Long id);
    Diary findDiaryByDate(Date date);

    @EntityGraph(attributePaths = {"todoList"})
    @Query("SELECT d FROM Diary d WHERE FUNCTION('YEAR', d.date) = :year AND FUNCTION('MONTH', d.date) = :month AND FUNCTION('DAY', d.date) = :day  AND d.userId = :userId")
    Diary findDiaryByYearAndMonthAndDayAndUserId(Integer year, Integer month, Integer day, Long userId);

    @EntityGraph(attributePaths = {"todoList"})
    @Query("SELECT d FROM Diary d WHERE FUNCTION('YEAR', d.date) = :year AND FUNCTION('MONTH', d.date) = :month AND d.userId = :userId")
    List<Diary> findDiariesByYearAndMonthAndUserId(Integer year, Integer month, Long userId);
    void deleteDiaryById(Long id);
}