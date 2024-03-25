import React, {useEffect, useState} from "react";
import styled from "styled-components";
import emptyNote from "../../../icon/emptyNote.png"
import Todo from "./Todo";
import axios from "axios";
import myTodoPage from "./MyTodoPage";

const Wrapper = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Pagination = styled.div`
    margin-top: 10px;
`

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
`

const SaveButton = styled.button`
    margin: 3px;
    font-size: large;
    border-radius: 5px;
    margin-top: 10px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

function MyTodoList({state}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [todoIndex, setTodoIndex] = useState(0);

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodoIndex(0)
    }, []);

    useEffect(() => {
        fetchData()
    }, [currentPage]);

    // 서버에서 Todo 데이터를 불러오는 함수
    const fetchData = () => {
        axios.post(`/todo/${state}/${currentPage}`)
            .then(response => {
                // 서버에서 받아온 다이어리 데이터 목록을 상태에 설정합니다.
                let tmpIndex = todoIndex
                console.log(response.data)
                setStartPage(response.data.data.startPage)
                setEndPage(response.data.data.endPage)
                setTotalPages(response.data.data.totalPage)
                setTodos(response.data.data.todoList.map(todo => {
                    return {...todo, key: tmpIndex++}
                }));
                setTodoIndex(tmpIndex)
            })
            .catch(error => {
                console.error('Todo 데이터 초기화 실패: ', error);
            });
    };

    // Todo 삭제 함수
    const deleteTodo = (key) => {
        // const updatedTodos = todos.filter(todo => todo.id !== key);
        console.log(todos)
        const updatedTodos = todos.map(todo => {
            if (todo.key === key)
                todo.state = 4
            return todo
        });
        setTodos(updatedTodos);
    };

    // 페이지 번호 클릭 시 해당 페이지의 데이터를 불러오는 함수
    const handlePageClick = (page) => {
        console.log(page)
        setCurrentPage(page)
    };

    const handleJumpButtonClick = (flag) => {
        let newPage = flag > 0 ? endPage + 1 : startPage - 1
        if (newPage < 1) {
            setCurrentPage(1)
        } else if (newPage > totalPages) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(newPage)
        }
    };

    const saveTodos = () => {
        console.log(todos)
        axios.post('/todo/save', todos)
            .then(response => {
                if (response.data.success) {
                    // 성공 시 로직
                    fetchData()
                    console.log(response)
                } else {
                    // 실패 시 로직
                    console.error('Todo 수정 실패:', response)
                }
            })
            .catch(error => {
                console.error('Todo 수정 실패:', error);
            });
    }

    return (
        <Wrapper>
            {todos.map(todo => {
                if (todo.state !== 4)
                    return (<Todo
                        todoData={todo}
                        key={todo.key}
                        setTodos={setTodos}
                        todos={todos}
                        deleteTodo={() => deleteTodo(todo.key)} // 삭제 함수 전달
                        isRef={false}
                    />)
                else return null
            })}
            <ButtonContainer>
                <SaveButton onClick={saveTodos}>저장</SaveButton>
                <SaveButton onClick={() => fetchData()}>새로고침</SaveButton>
            </ButtonContainer>
            <Pagination>
                <PaginationButton onClick={() => handleJumpButtonClick(-1)}>&lt;</PaginationButton>
                {Array.from({length: endPage - startPage + 1}, (_, index) => (
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