import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import BasicInput from "../ui/BasicInput";
import popoLogo from "../../icon/popo.png"

const Wrapper = styled.div`
    width: calc(100% - 32px);
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledForm = styled.form`
    width: 30%;
    height: 40%;
    max-width: 720px;
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
    color: tan;
`

function LoginPage(props) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Wrapper>
            <Logo src={popoLogo}/>
            <StyledForm>
                <Title>PoPo 다이어리</Title>
                <fieldset>
                    <legend>로그인</legend>
                    <table>
                        <tr>
                            <td><InputLabel>아이디</InputLabel></td>
                            <td><BasicInput value={userId} name={"username"} setFunction={setUserId}/></td>
                        </tr>
                        <tr>
                            <td><InputLabel>비밀번호</InputLabel></td>
                            <td><BasicInput value={password} name={"password"} setFunction={setPassword}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <LoginDiv>
                                    <button type={"button"}>로그인</button>
                                </LoginDiv>
                            </td>
                        </tr>
                    </table>
                </fieldset>
                <Link to={"#"}>회원가입</Link>
            </StyledForm>
        </Wrapper>
    );
}

export default LoginPage;