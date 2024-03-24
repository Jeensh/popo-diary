import React, { useState } from 'react';
import styled from 'styled-components';

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
    width: 200px;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
`;

const Title = styled.h3`
    margin-top: 0;
`;

const Input = styled.input`
    width: 80%;
    padding: 8px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Button = styled.button`
    margin-left: 10px;
    padding: 8px 16px;
    cursor: pointer;
    background-color: #282c34;
    color: white;
    border: none;
    border-radius: 5px;
`;

function FriendModal({ closeModal, setFriendName }) {
    const [friendName, setFriendNameInput] = useState('');

    const handleSave = () => {
        setFriendName(friendName);
        closeModal();
    };

    return (
        <ModalContainer>
            <ModalContent>
                <Title>친구 아이디 입력</Title>
                <Input
                    type="text"
                    placeholder="친구 아이디를 입력하세요"
                    value={friendName}
                    onChange={(e) => setFriendNameInput(e.target.value)}
                />
                <ButtonContainer>
                    <Button onClick={handleSave}>저장</Button>
                    <Button onClick={closeModal}>취소</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalContainer>
    );
}

export default FriendModal;