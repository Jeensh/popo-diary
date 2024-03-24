import React, {useEffect, useState} from 'react';
import { ImMan } from "react-icons/im";
import { FaRunning } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";

const StyledButton = styled.button`
    font-size: large;
    background: none;
    border: none;
    cursor: pointer;
    padding-top: 5px;
`
const Content = styled.span`
    vertical-align: 5px;
    font-size: large;
`

const Todo = ({deleteTodo, setTodos, todos, todoData, isRef}) => {
    // Todo의 상태(state)를 관리합니다. 기본값은 'todo'입니다.
    const [status, setStatus] = useState(todoData.state);

    // 체크 버튼을 클릭할 때 호출되는 함수입니다.
    const handleCheck = () => {
        // 상태를 변경합니다.
        if(isRef){
            alert("친구의 일정을 망치지 말아요 ㅠㅠ")
        }
        else {
            setStatus((status + 1) % 3);
            setState(todoData.key, (status + 1) % 3)
        }
    };

    const setState = (key, newState) => {
        // Todo의 key 값으로 해당 Todo를 찾습니다.
        const updatedTodos = todos.map(todo => {
            if (todo.key === key) {
                // 찾은 Todo의 상태를 변경합니다.
                return { ...todo, state: newState };
            }
            return todo;
        });

        // 변경된 Todo 목록으로 상태를 업데이트합니다.
        setTodos(updatedTodos);
    };

    // 각 상태에 따라 표시할 아이콘을 지정합니다.
    let icon;
    switch (status) {
        case 0:
            icon = <ImMan />;
            break;
        case 1:
            icon = <FaRunning />;
            break;
        case 2:
            icon = <FaCheck />;
            break;
    }

    return (
        <div className="todo-item">
            <StyledButton onClick={deleteTodo}><TiDelete/></StyledButton>
            <Content>{todoData.content}</Content>
            <StyledButton onClick={handleCheck}>{icon}</StyledButton>
        </div>
    );
};

export default Todo;