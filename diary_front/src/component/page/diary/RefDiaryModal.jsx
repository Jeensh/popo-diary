import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Todo from "./Todo";
import FriendModal from "./FriendModal";
import axios from "axios";
import todo from "./Todo";

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    max-height: 600px; /* 모달 내용의 최대 높이를 설정합니다. */
    overflow-y: auto; /* 수직 스크롤을 추가합니다. */
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: xx-large;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const TitleInput = styled.input`
    border: none;
    outline: none; /* 포커스 효과를 없앱니다. */
    font-size: xx-large;
    width: 800px;
`
const ContentInput = styled.textarea`
    border: thin solid lightgray;
    outline: none; /* 포커스 효과를 없앱니다. */
    font-size: large;
    width: 800px;
    height: 300px;
`

const TodoForm = styled.form`

`

const TodoInput = styled.input`
    width: 200px;
`

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledTitle = styled.h3`
    margin: 0;
`

const TodoContainer = styled.div`

`

const ContentContainer = styled.div`

`

const FriendText = styled.span`
    margin-right: 5px;
`

let todoIndex = 0;

function RefDiaryModal({closeModal, date, diary, doReload}) {
    const [todos, setTodos] = useState([]); // Todo 목록 상태
    const [newTodoContent, setNewTodoContent] = useState(''); // 새로운 Todo 내용 상태
    const [friendName, setFriendName] = useState(''); // 친구 이름 상태
    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false); // 친구 이름 입력 모달 열림 상태
    const [title, setTitle] = useState(""); // 다이어리 제목 상태
    const [content, setContent] = useState(diary.content); // 다이어리 내용 상태


    useEffect(() => {
        todoIndex = 0
        setTitle(diary.title)
        setFriendName(diary.friendName)
        setContent(diary.content); // diary의 content를 content 상태로 설정
        setTodos(diary.todoList.map(todo => {
            return {...todo, key: todoIndex++}
        }))
    }, []);

    // Todo 삭제 함수
    const deleteTodo = (key) => {
        alert("친구의 일정을 망치지 말아요 ㅜㅜ")
    };
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            // 모달 바깥을 클릭하면 모달을 닫습니다.
            closeModal();
        }
    };

    const saveDiary = () => {
        // 다이어리 정보 추가
        const data = {
            id: diary.id,
            title: title,
            content: document.getElementById("content").value,
            friendName: friendName,
            todoList: todos,
            date: new Date(date).toISOString()
        };

        console.log("todos : ", todos)

        axios.post('/diary/save', data,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.success) {
                    // 성공 시 로직
                    doReload()
                    closeModal()
                    console.log(response)
                } else {
                    // 실패 시 로직
                    console.log(response)
                }
            })
            .catch(error => {
                console.error('다이어리 저장 실패:', error);
            });
    }

    return (
        <div>
            <ModalContainer onClick={handleBackgroundClick}>
                <ModalContent>
                    <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
                    <h2>{date.toDateString()}</h2>
                    <StyledTitle>To do</StyledTitle>
                    <TodoContainer>
                        {todos.map(todo => (
                            <Todo
                                todoData={todo}
                                key={todo.key}
                                setTodos={setTodos}
                                todos={todos}
                                deleteTodo={() => deleteTodo(todo.key)} // 삭제 함수 전달
                                isRef={true}
                            />
                        ))}
                    </TodoContainer>
                    <TitleInput type="text" readOnly onChange={(e) => setTitle(e.target.value)} name="title" placeholder={"제목"} value={title}/>
                    <ContentContainer>
                        <ContentInput id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}></ContentInput>
                    </ContentContainer>
                    <OptionContainer>
                        <button onClick={saveDiary}>저장</button>
                        <div>
                            <FriendText>일기 주인 : {diary.username}</FriendText>
                        </div>
                    </OptionContainer>
                    {isFriendModalOpen && (
                        <FriendModal
                            closeModal={() => setIsFriendModalOpen(false)}
                            setFriendName={setFriendName}
                        />
                    )}
                </ModalContent>
            </ModalContainer>
        </div>
    );
}

export default RefDiaryModal;