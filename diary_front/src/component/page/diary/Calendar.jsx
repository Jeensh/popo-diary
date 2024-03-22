import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/CustomCalendar.css'
import writtenLogo from "../../../icon/written.png"
import styled from "styled-components";
import DiaryModal from "./DiaryModal";

const customDates = [
    "2024-03-25",
    "2024-04-01",
    "2024-04-10",
    "2024-03-10"
]

const WrittenLogo = styled.img`
    height: 25px;
    width: 50px;
`

function CustomCalendar() {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 열림 여부 상태

    // 특정 날짜 목록에서 해당 날짜와 일치하는지 확인하는 함수
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열로 변환
            if (customDates.includes(dateString)) {
                // 특정 날짜 목록에 해당하는 날짜가 있으면 이미지를 반환합니다.
                return <WrittenLogo src={writtenLogo} alt="Special Date" />;
            }
        }
    };

    // 특정 날짜에 해당하는 셀에 클래스를 추가하는 함수
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().slice(0, 10);
            if (customDates.includes(dateString)) {
                // 특정 날짜 목록에 해당하는 날짜가 있으면 'special-date' 클래스를 반환합니다.
                return 'special-date';
            }
        }
    };

    // 특정 날짜 셀을 클릭했을 때 실행되는 함수
    const handleClickDay = (value, event) => {
        setSelectedDate(value); // 클릭한 날짜 정보를 상태에 저장합니다.
        // 여기에 클릭 이벤트 처리 로직을 추가하세요
        setShowModal(true); // 모달을 엽니다.
        console.log('Clicked Date:', value); // 클릭한 날짜 정보를 콘솔에 출력합니다.
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
                />
            </div>
            {showModal && (<DiaryModal closeModal={closeModal} date={selectedDate} />
            )}
        </div>
    );
}

export default CustomCalendar;