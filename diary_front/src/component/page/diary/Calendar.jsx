import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/CustomCalendar.css'
import writtenLogo from "../../../icon/written.png"
import styled from "styled-components";

const customDates = [
    "2024-03-25",
    "2024-04-01",
    "2024-04-10",
    "2024-03-10"
]

const WrittenLogo = styled.img`
    height: 50px;
    width: 90px;
`

function CustomCalendar() {
    const [date, setDate] = useState(new Date());

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
                />
            </div>
        </div>
    );
}

export default CustomCalendar;