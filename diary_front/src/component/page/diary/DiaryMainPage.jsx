import React, { useState } from 'react';
import CustomCalendar from './Calendar';
import DiaryNavigation from "./DiaryNavigation";
import styled from "styled-components";
// import AnotherComponent from './AnotherComponent'; // 다른 컴포넌트 import

const Wrapper = styled.div`
    min-width: 800px;
`

const DiaryMainPage = () => {
    const [activeTab, setActiveTab] = useState('calendar'); // 기본 탭은 Calendar

    return (
        <Wrapper>
            <DiaryNavigation setActiveTab={setActiveTab} />
            {activeTab === 'calendar' && <CustomCalendar />}
            {activeTab === 'refDiary' && "공유받은 다이어리 목록"}
            {activeTab === 'uncheckedTodo' && "완료가 안된 Todo 목록"}
        </Wrapper>
    );
};

export default DiaryMainPage;