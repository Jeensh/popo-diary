import React, { useState } from 'react';
import CustomCalendar from './Calendar';
import DiaryNavigation from "./DiaryNavigation";
import styled from "styled-components";
import RefDiaryPage from "./RefDiaryPage";
import MyTodoPage from "./MyTodoPage";
// import AnotherComponent from './AnotherComponent'; // 다른 컴포넌트 import

const Wrapper = styled.div`
    min-width: 1250px;
`

const DiaryMainPage = () => {
    const [activeTab, setActiveTab] = useState('calendar'); // 기본 탭은 Calendar

    return (
        <Wrapper>
            <DiaryNavigation setActiveTab={setActiveTab} />
            {activeTab === 'calendar' && <CustomCalendar />}
            {activeTab === 'refDiary' && <RefDiaryPage />}
            {activeTab === 'uncheckedTodo' && <MyTodoPage />}
        </Wrapper>
    );
};

export default DiaryMainPage;