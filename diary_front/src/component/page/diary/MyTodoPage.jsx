import React from "react";
import styled from "styled-components";
import emptyNote from "../../../icon/emptyNote.png"
import MyTodoList from "./MyTodoList";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    min-width: 1200px;
`

const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(${emptyNote});
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: 20px;
    margin-right: 8px;
    margin-left: 8px;
    width: 400px;
    height: 573px;
`

const Title = styled.div`
    font-size: xx-large;
    font-weight: bold;
    margin-top: 90px
`

function MyTodoPage() {

    return (
      <Wrapper>
          <TodoContainer>
              <Title>완료 일정</Title>
              <MyTodoList
                  state = {2}
              />
          </TodoContainer>
          <TodoContainer>
              <Title>진행 중</Title>
              <MyTodoList
                  state = {1}
              />
          </TodoContainer>
          <TodoContainer>
              <Title>진행 대기</Title>
              <MyTodoList
                  state = {0}
              />
          </TodoContainer>
      </Wrapper>
    );
}

export default MyTodoPage;