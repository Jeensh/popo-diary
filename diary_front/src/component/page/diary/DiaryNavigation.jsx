import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../icon/popo.png'; // 로고 이미지 경로

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    padding-bottom: 0;
    background-color: #f0f0f0;
`;

const LogoContainer = styled.div`
    background: white;
    padding: 5px;
    padding-right: 10px;
    padding-bottom: 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 설정 */
    border-radius: 5px 5px 5px 5px;
    margin-bottom: 10px;
`

const Logo = styled.img`
    height: 40px;
    margin-right: 10px;
`;

const Title = styled.span`
    font-size: 40px;
    vertical-align: 5px;
`;

const NavLink = styled.button`
    border: none;
    font-size: 30px;
    margin-right: 10px;
    text-decoration: none;
    color: #333;

    @keyframes buttonEnlarge {
        0% {
        }
        100% {
            font-weight: bold; /* 최종 시의 글자 크기 */
        }
    }
    
    &:hover {
        color: #555;
        animation: buttonEnlarge 0.1s ease-in-out forwards; /* hover 시 애니메이션 적용 */
    }
`;

const NavLinks = styled.div`
    display: flex;
    margin-right: 9%;
`;

const LogoutButton = styled(Link)`
    text-decoration: none;
    color: #333;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;

    &:hover {
        background-color: #ccc;
    }
`;

const DiaryNavigation = (props) => {
    const {setActiveTab} = props

    return (
        <Wrapper>
            <LogoContainer>
                <Logo src={logo} alt="Logo"/>
                <Title>Popo Diary</Title>
            </LogoContainer>
            <NavLinks>
                <NavLink onClick={() => setActiveTab('calendar')}>My Diary</NavLink>
                <NavLink onClick={() => setActiveTab('refDiary')}>Friend's Diary</NavLink>
                <NavLink onClick={() => setActiveTab('uncheckedTodo')}>To Do</NavLink>
            </NavLinks>
            <LogoutButton to="/">Logout</LogoutButton>
        </Wrapper>
    );
};

export default DiaryNavigation;