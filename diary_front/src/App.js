import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./component/page/LoginPage";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
import styled from "styled-components";

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
          <Route path={"post-write"} element={<PostWritePage/>}/>
          <Route path={"post/:postId"} element={<PostViewPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}
export default App;
