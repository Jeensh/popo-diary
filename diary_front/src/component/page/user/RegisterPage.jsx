import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import BasicInput from "../../ui/BasicInput";
import popoLogo from "../../../icon/popo.png"
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
`

const Title = styled.h1`
    font-size: xxx-large;
    color: tan;
`

const register = (username, password, name, navigate, setMessage) => {

    // 로그인 요청에 사용될 데이터 객체 생성
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);

    axios.post('/user/register', formData)
        .then(response => {
            if(response.data.success){
                navigate("/")
                console.log('회원가입 성공:', response.data);
            }
            else{
                setMessage(response.data.message)
                console.log('회원가입 실패:')
            }
        })
        .catch(error => {
            // 회원가입 실패 또는 오류 발생한 경우 처리할 내용
            console.error('회원가입 실패:', error);
        });
};

const Message = styled.p`
    color: red;
    font-size: x-large;
    font-weight: bold;
`

function LoginPage(props) {
    const navigate = useNavigate()
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    return (<Wrapper>
        <FormContainer>
            <Logo src={popoLogo}/>
            <StyledForm>
                <Title>PoPo 다이어리</Title>
                <fieldset>
                    <legend>회원가입</legend>
                    <table>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td><InputLabel>아이디</InputLabel></td>
                            <td><BasicInput value={userId} name={"username"} setFunction={setUserId}/></td>
                        </tr>
                        <tr>
                            <td><InputLabel>비밀번호</InputLabel></td>
                            <td><BasicInput value={password} name={"password"} setFunction={setPassword}/></td>
                        </tr>
                        <tr>
                            <td><InputLabel>이름</InputLabel></td>
                            <td><BasicInput value={name} name={"name"} setFunction={setName}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <LoginDiv>
                                    <button onClick={() => register(userId, password, name, navigate, setMessage)} type={"button"}>회원가입</button>
                                </LoginDiv>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </fieldset>
                <Link to={"/"}>로그인 페이지</Link>
            </StyledForm>
        </FormContainer>
        <Message>
            {message}
        </Message>
    </Wrapper>);
}

export default LoginPage;