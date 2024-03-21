import React, {useState} from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import {ThemeProvider} from 'styled-components';
import CustomCalendar from "./Calendar";
import theme from './theme';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function DiaryMainPage() {
    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <CustomCalendar/>
            </Wrapper>
        </ThemeProvider>
    );
}

export default DiaryMainPage;