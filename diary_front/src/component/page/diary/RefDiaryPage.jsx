import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/CustomCalendar.css'
import writtenLogo from "../../../icon/written.png"
import styled from "styled-components";
import DiaryModal from "./DiaryModal";
import axios from "axios";
import Todo from "./Todo";
import RefDiary from "./RefDiary";
import letterBackground from "../../../icon/letterBackground.png"
import RefDiaryModal from "./RefDiaryModal";

const RefDiaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(${letterBackground});
    background-size: cover;
    background-repeat: no-repeat;
    width: 600px;
    height: 760px;
`
const RefDiaryList = styled.div`
    margin-top: 100px;
`

const Pagination = styled.div`
    margin-top: 20px;
`;

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
`;

let currentPage = 1
let startPage = 1
let endPage = 1
let totalPages = 1

function RefDiaryPage() {
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 열림 여부 상태
    const [Diaries, setDiaries] = useState([]); // 다이어리 데이터 목록 상태

    useEffect(() => {
        fetchData(currentPage);
    }, []);

    // 서버에서 다이어리 데이터를 불러오는 함수
    const fetchData = () => {
        axios.post(`/diary/ref/${currentPage}`)
            .then(response => {
                // 서버에서 받아온 다이어리 데이터 목록을 상태에 설정합니다.
                console.log(response.data)
                startPage = response.data.data.startPage
                endPage = response.data.data.endPage
                totalPages = response.data.data.totalPage
                setDiaries(response.data.data.diaryList);
            })
            .catch(error => {
                console.error('다이어리 데이터 초기화 실패: ', error);
            });
    };

    // 모달을 닫는 함수
    const closeModal = () => {
        setShowModal(false); // 모달을 닫습니다.
    };

    // 페이지 번호 클릭 시 해당 페이지의 데이터를 불러오는 함수
    const handlePageClick = (page) => {
        currentPage = page
        fetchData()
    };

    const handleJumpButtonClick = (flag) => {
        let newPage = flag > 0 ? endPage + 1 : startPage - 1
        if (newPage < 1) {
            currentPage = 1;
        } else if (newPage > totalPages) {
            currentPage = totalPages;
        } else{
          currentPage = newPage
        }
        console.log(currentPage)
        fetchData();
    };

    const openDiary = (diary) => {
        console.log(diary)
        setShowModal(true)
        setSelectedDiary(diary)
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <RefDiaryContainer>
                <h1>Friend's diaries</h1>
                <RefDiaryList>
                    {Diaries.map(diary => (
                        <RefDiary
                            openDiary={() => openDiary(diary)}
                            diary={diary}
                            key={diary.id}
                        />
                    ))}
                </RefDiaryList>
                <Pagination>
                    <PaginationButton onClick={() => handleJumpButtonClick(-1)}>&lt;</PaginationButton>
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
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
            </RefDiaryContainer>
            {showModal && (<RefDiaryModal closeModal={closeModal} date={new Date(selectedDiary.date)} diary={selectedDiary}
                                       doReload={() => fetchData(currentPage)}/>)}
        </div>
    );
}

export default RefDiaryPage;




