import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/CustomCalendar.css'
import writtenLogo from "../../../icon/written.png"
import styled from "styled-components";
import DiaryModal from "./DiaryModal";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const WrittenLogo = styled.img`
    height: 25px;
    width: 50px;
`

function CustomCalendar() {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 열림 여부 상태
    const [Diaries, setDiaries] = useState([]); // 다이어리 데이터 목록 상태
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(date.getFullYear(), date.getMonth() + 1);
    }, []);

    // 서버에서 다이어리 데이터를 불러오는 함수
    const fetchData = (year, month) => {
        axios.post(`/diary/${year}/${month}`)
            .then(response => {
                // 서버에서 받아온 다이어리 데이터 목록을 상태에 설정합니다.
                console.log(response.data.data)
                setDiaries(response.data.data);
            })
            .catch(error => {
                console.error('다이어리 데이터 초기화 실패: ', error);
                navigate("/")
            });
    };

    // 특정 날짜 목록에서 해당 날짜와 일치하는지 확인하는 함수
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const newDate = new Date(date)
            newDate.setDate(newDate.getDate() + 1)
            const dateString = newDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열로 변환
            for(let i = 0; i < Diaries.length; i++){
                if(dateString === Diaries[i].date){
                        return <WrittenLogo src={writtenLogo} alt="Special Date" />;
                }
            }
        }
    };

    // 특정 날짜에 해당하는 셀에 클래스를 추가하는 함수
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const newDate = new Date(date)
            newDate.setDate(newDate.getDate() + 1)
            const dateString = newDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열로 변환
            for(let i = 0; i < Diaries.length; i++){
                if(dateString === Diaries[i].date){
                    return 'special-date';
                }
            }
        }
    };

    // 특정 날짜 셀을 클릭했을 때 실행되는 함수
    const handleClickDay = (value, event) => {
        setSelectedDate(value); // 클릭한 날짜 정보를 상태에 저장합니다.
        // 여기에 클릭 이벤트 처리 로직을 추가하세요
        const newDate = new Date(value)
        newDate.setDate(newDate.getDate() + 1)
        const dateString = newDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열로 변환

        for(let i = 0; i < Diaries.length; i++){
            if(dateString === Diaries[i].date){
                setSelectedDiary(Diaries[i])
                setShowModal(true);
                return;
            }
        }
        setSelectedDiary({
            content: "",
            date: dateString,
            friendName: "",
            id: 0,
            title: "",
            todoList: [],
            username: ""
        })
        setShowModal(true); // 모달을 엽니다.
    };

    // 모달을 닫는 함수
    const closeModal = () => {
        setShowModal(false); // 모달을 닫습니다.
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>My Todo Diary</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Calendar
                    onChange={setDate}
                    value={date}
                    calendarType="gregory"
                    className="custom-calendar"
                    tileContent={tileContent} // tileContent prop에 함수를 전달합니다.
                    tileClassName={tileClassName} // tileClassName prop에 함수를 전달합니다.
                    onClickDay={handleClickDay} // 클릭 이벤트 핸들러를 전달합니다.
                    onActiveStartDateChange={({ activeStartDate }) => fetchData(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1)} // 캘린더의 월 변경 이벤트에 fetchData 함수 연결
                    onViewChange={({ activeStartDate }) => fetchData(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1)} // 캘린더의 월 변경 이벤트에 fetchData 함수 연결
                />
            </div>
            {showModal && (<DiaryModal closeModal={closeModal} date={selectedDate} diary={selectedDiary} doReload={() => fetchData(selectedDate.getFullYear(), selectedDate.getMonth() + 1)} />)}
        </div>
    );
}

export default CustomCalendar;




