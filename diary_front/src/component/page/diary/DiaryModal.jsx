import React, {useState} from 'react';
import styled from 'styled-components';
import Todo from "./Todo";
import FriendModal from "./FriendModal";
import axios from "axios";

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

function DiaryModal({closeModal, date, id}) {
    const [todos, setTodos] = useState([]); // Todo 목록 상태
    const [newTodoContent, setNewTodoContent] = useState(''); // 새로운 Todo 내용 상태
    const [friendId, setFriendId] = useState(''); // 친구 이름 상태
    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false); // 친구 이름 입력 모달 열림 상태
    const [title, setTitle] = useState(""); // 다이어리 제목 상태


    // Todo 추가 함수
    const addTodo = () => {
        const newTodo = {id: Date.now(), content: newTodoContent}; // 입력된 내용을 새로운 Todo에 포함
        setTodos([...todos, newTodo]);
        setNewTodoContent(''); // 입력 필드 초기화
    };

    // Todo 삭제 함수
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            // 모달 바깥을 클릭하면 모달을 닫습니다.
            closeModal();
        }
    };

    const saveDiary = () => {


        // 로그인 요청에 사용될 데이터 객체 생성
        const formData = new FormData();
        // 다이어리 정보 추가
        formData.append('id', id);
        formData.append('title', title);

        // Todo 리스트 정보 추가

        console.log(formData.values)
        // axios.post('/user/register', formData)
        //     .then(response => {
        //         if (response.data.success) {
        //             // 성공 시 로직
        //         } else {
        //             // 실패 시 로직
        //         }
        //     })
        //     .catch(error => {
        //         console.error('다이어리 저장 실패:', error);
        //     });
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
                                key={todo.id}
                                content={todo.content}
                                deleteTodo={() => deleteTodo(todo.id)} // 삭제 함수 전달
                            />
                        ))}
                        <TodoForm>
                            <TodoInput
                                type="text"
                                value={newTodoContent}
                                onChange={(e) => setNewTodoContent(e.target.value)} // 입력 내용 변경
                            />
                            <button type="button" onClick={addTodo}>Todo 추가</button>
                        </TodoForm>
                    </TodoContainer>
                    <TitleInput type="text" onChange={(e) => setTitle(e.target.value)} name="title" placeholder={"제목"} value={title}/>
                    <ContentContainer>
                        <ContentInput name="content"></ContentInput>
                    </ContentContainer>
                    <OptionContainer>
                        <button onClick={saveDiary}>저장</button>
                        <div>
                            <FriendText>친구 : {friendId}</FriendText>
                            <button onClick={() => setIsFriendModalOpen(true)}>친구 지정하기</button>
                        </div>
                    </OptionContainer>
                    {isFriendModalOpen && (
                        <FriendModal
                            closeModal={() => setIsFriendModalOpen(false)}
                            setFriendId={setFriendId}
                        />
                    )}
                </ModalContent>
            </ModalContainer>
        </div>
    );
}

export default DiaryModal;