import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./component/page/user/LoginPage";
import styled from "styled-components";
import RegisterPage from "./component/page/user/RegisterPage";
import DiaryMainPage from "./component/page/diary/DiaryMainPage";

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage/>}/>
          <Route path={"register"} element={<RegisterPage/>}/>
          <Route path={"main"} element={<DiaryMainPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}
export default App;
