import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import BasicInput from "../../ui/BasicInput";
import popoLogo1 from "../../../icon/popo.png"
import popoLogo2 from "../../../icon/popo2.png"
import popoLogo3 from "../../../icon/popo3.png"
import axios from "axios";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    @keyframes shadow-animation {
        0% {
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
        }
        50% {
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
        }
        100% {
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
        }
    }

    animation: shadow-animation 5s infinite;
`

const StyledForm = styled.form`
    width: 400px;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const InputLabel = styled.span`
    font-weight: bold;
`

const LoginDiv = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: center;
`

const Logo = styled.img`
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    transition: opacity 0.7s ease-in-out;
`

const Title = styled.h1`
    font-size: xxx-large;
    color: tan;
`

const login = (username, password, navigate, setMessage, setPassword) => {
    // 로그인 요청에 사용될 데이터 객체 생성
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    axios.post('/user/auth', formData)
        .then(response => {
            if(response.data.success){
                console.log('로그인 성공');
                navigate("/main")
            }
            else{
                console.log('로그인 실패')
                setMessage("아이디와 비밀번호를 다시 확인하세요!")
                setPassword("")
            }
        })
        .catch(error => {
            // 로그인 실패 또는 오류 발생한 경우 처리할 내용
            console.error('로그인 실패:', error);
        });
};

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        document.getElementById("loginBtn").click();
    }
};

const logout = () => {
    axios.post('/user/logout')
        .then(res => {
            console.log(res)
        })
}

const Message = styled.p`
    color: red;
    font-size: x-large;
    font-weight: bold;
`

const ImageContainer = styled.div`
`

const images = [
    popoLogo1,
    popoLogo3
];


function LoginPage(props) {
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [index, setIndex] = useState(0);

    // 로그아웃
    useEffect(() => {
        logout()
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 700);
        return () => {
            // 언마운트 시 실행되는 cleanup 코드
            // useEffect 내부에서 cleanup 함수를 반환하면 해당 함수는 컴포넌트가 unmount될 때 실행됩니다.
            clearInterval(interval);
        };
    }, [])

    return (<Wrapper>
        <FormContainer>
            <ImageContainer>
                <Logo
                    src={images[index]}
                    alt={`Image ${index + 1}`}
                />
            </ImageContainer>
            <StyledForm>
                <Title>PoPo 다이어리</Title>
                <fieldset>
                    <legend>로그인</legend>
                    <table>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td><InputLabel>아이디</InputLabel></td>
                            <td><BasicInput value={userId} name={"username"} setFunction={setUserId}/></td>
                        </tr>
                        <tr>
                            <td><InputLabel>비밀번호</InputLabel></td>
                            <td><BasicInput value={password} name={"password"} setFunction={setPassword} onKeyDown={handleKeyDown}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <LoginDiv>
                                    <button id={"loginBtn"} onClick={() => login(userId, password, navigate, setMessage, setPassword)} type={"button"}>로그인</button>
                                </LoginDiv>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </fieldset>
                <Link to={"register"}>회원가입</Link>
            </StyledForm>
        </FormContainer>
        <Message>
            {message}
        </Message>
    </Wrapper>);
}

export default LoginPage;