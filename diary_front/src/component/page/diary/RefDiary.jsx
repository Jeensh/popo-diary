import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    border-bottom: 1px solid black;
    width: 400px;
    cursor: pointer;
`

const Title = styled.span`
    font-size: x-large;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
`

const FriendSpan = styled.span`
    font-size: x-large;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
`

const DateSpan = styled.span`
    padding-top: 7px;
    font-size: medium;
    font-weight: bold;
`

const RefDiary = ({diary, openDiary}) => {

    return (
        <Wrapper onClick={openDiary}>
            <Title>From. {diary.username}</Title>
            <Title>{diary.title}</Title>
            <DateSpan>{diary.date}</DateSpan>
        </Wrapper>
    );
};

export default RefDiary;