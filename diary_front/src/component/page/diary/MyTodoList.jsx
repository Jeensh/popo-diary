import React, {useEffect, useState} from "react";
import styled from "styled-components";
import emptyNote from "../../../icon/emptyNote.png"
import Todo from "./Todo";
import axios from "axios";

const Wrapper = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Pagination = styled.div`
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    border-radius: 3px;
    &:hover {
        background-color: #f0f0f0;
    }
    &:disabled {
        cursor: not-allowed;
        background-color: #ccc;
    }
`;

let currentPage = 1
let startPage = 1
let endPage = 1
let totalPages = 1

function MyTodoList({state}) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchData(currentPage);
    }, []);

    // 서버에서 Todo 데이터를 불러오는 함수
    const fetchData = () => {
        axios.post(`/todo/${state}/${currentPage}`)
            .then(response => {
                // 서버에서 받아온 다이어리 데이터 목록을 상태에 설정합니다.
                console.log(response.data)
                startPage = response.data.data.startPage
                endPage = response.data.data.endPage
                totalPages = response.data.data.totalPage
                setTodos(response.data.data.todoList);
            })
            .catch(error => {
                console.error('Todo 데이터 초기화 실패: ', error);
            });
    };

    // Todo 삭제 함수
    const deleteTodo = (key) => {
        const updatedTodos = todos.filter(todo => todo.id !== key);
        setTodos(updatedTodos);
    };

    // 페이지 번호 클릭 시 해당 페이지의 데이터를 불러오는 함수
    const handlePageClick = (page) => {
        currentPage = page
        fetchData()
    };

    const handleJumpButtonClick = (flag) => {
        let newPage = flag > 0 ? endPage + 1 : startPage - 1
        if (newPage < 1) {
            currentPage = 1;
        } else if (newPage > totalPages) {
            currentPage = totalPages;
        } else{
            currentPage = newPage
        }
        fetchData();
    };

    return (
        <Wrapper>
            {todos.map(todo => (
                <Todo
                    todoData={todo}
                    key={todo.id}
                    setTodos={setTodos}
                    todos={todos}
                    deleteTodo={() => deleteTodo(todo.id)} // 삭제 함수 전달
                    isRef={false}
                />
            ))}
            <Pagination>
                <PaginationButton onClick={() => handleJumpButtonClick(-1)}>&lt;</PaginationButton>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <PaginationButton
                        key={startPage + index}
                        onClick={() => handlePageClick(startPage + index)}
                        disabled={currentPage === startPage + index}
                    >
                        {startPage + index}
                    </PaginationButton>
                ))}
                <PaginationButton onClick={() => handleJumpButtonClick(1)}>&gt;</PaginationButton>
            </Pagination>
        </Wrapper>
    );
}

export default MyTodoList;