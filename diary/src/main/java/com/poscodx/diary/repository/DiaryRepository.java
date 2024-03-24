package com.poscodx.diary.repository;

import com.poscodx.diary.model.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @Query("SELECT d FROM Diary d WHERE FUNCTION('YEAR', d.date) = :year AND FUNCTION('MONTH', d.date) = :month AND FUNCTION('DAY', d.date) = :day  AND d.username = :username")
    Diary findDiaryByYearAndMonthAndDayAndUserId(Integer year, Integer month, Integer day, String username);

//    @EntityGraph(attributePaths = {"todoList"})
//    @Query("SELECT d FROM Diary d WHERE FUNCTION('YEAR', d.date) = :year AND FUNCTION('MONTH', d.date) = :month AND d.username = :username")
//    List<Diary> findDiariesByYearAndMonthAndUserId(Integer year, Integer month, String username);

    @EntityGraph(attributePaths = {"todoList"})
    @Query("SELECT d FROM Diary d WHERE FUNCTION('YEAR', d.date) >= :beginYear AND FUNCTION('MONTH', d.date) >= :beginMonth " +
            "AND FUNCTION('YEAR', d.date) <= :endYear AND FUNCTION('MONTH', d.date) <= :endMonth AND d.username = :username")
    List<Diary> findDiariesBetweenYearsAndMonths(Integer beginYear, Integer beginMonth, Integer endYear, Integer endMonth, String username);

    Page<Diary> findDiariesByFriendName(String friendName, Pageable pageable);

    void deleteDiaryById(Long id);
}