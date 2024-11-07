
import React, { useEffect } from 'react';

import './App.css';
import { Routes ,Route} from 'react-router-dom';
import Container from './layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_LIST_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, REACT_STUDY_PATH, USER_PATH } from './constants';
import Authentication from './views/Authentication';

import User from './views/User';
import Board from './views/Board';
import BoardList from './views/Board';
import Main from './views/Main';
import ReactStudy from './views/ReactStudy';
import {  useCookies } from 'react-cookie';
import useAuthStore from './stores/user.store';
import axios from 'axios';


function App() {
  const [cookies,setCookie,removeCookie] =useCookies(['token']);//useCooike
  const {login,logout} = useAuthStore();//zustand
  //function 
  //check token : 토큰의 유효성을 확인하는 비동기 함수
  const fetchUserData =async () =>{
      const token = cookies.token; 
      if(token){
        try{
          const response =await axios.get('/api/v1/users',{ 
            //http 요청의 헤더에 Authorization 헤더 추가하여 토큰을  포함시키는 예
            headers :{
              Authorization : `Bearer ${token}`
            }
        }); 
        // const response =  await axios.post('',) //토큰만 보낼때 는 ('asasd',null,)이렇게 작성
        if(response.status === 200){
          setCookie('token',token,{path:'/'}); 
          const userData =response.data.data; 
          return userData;
        }
        }catch(e){
          console.error("Failed to fetch user data",e); 
          removeCookie('token',{path:'/'})
        }
      }
  }


  const checkToken = async () =>{
    const token = cookies.token;

    if(token){
      try{
        const userData =  await fetchUserData();
        login(userData);
        
        const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        setCookie('token',token,{ path:'/', expires:expiryDate})

      }catch(e){
        console.error("토큰 유효성 확인중 오류 발생" , e); 
        removeCookie('token',{path :'/'}); 
      }
    }
  }

  //해당 페이지가 랜덜링 될때(열릴때 실행할려면) -> useEffect
  //컴포넌트가 처음 랜더링 될때 'check token' 함수를 호출하여 토큰 유효성을 확인
  useEffect (() => {
    checkToken();
  },[]) 

  return (
    <>
    {/* 빈 fragment :  최상위 단일 노드를 위한 틀  */}
    <Routes>
      <Route element={<Container/>}>
        {/* 
          Route 컴포넌트의 index 속성 
          : 상위 컴포넌트의 경로로 출력 (기본 자식 라우트)
          */}
          {/* <Route index element={<Main />} /> */}
          
          <Route path={MAIN_PATH} element={<Main />} />

          {/* 로그인 + 회원가입 화면 */}
          <Route path={AUTH_PATH} element={<Authentication />} />

          {/* 게시물 리스트 화면 */}
          <Route path={BOARD_LIST_PATH

          } element={<BoardList />} />

          {/* 게시물 상세 보기 화면 */}
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<Board />} />

          {/* 게시글 작성 화면 */}
          <Route path={BOARD_WRITE_PATH} element={<Board />} />

          {/* 게시글 수정 화면 */}
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<Board />} />

          {/* 마이페이지 */}
          <Route path={USER_PATH} element={<User />} />

          {/* 할 일 목록 화면 */}
          {/* <Route path={TODO_PATH} element={<Todo />} /> */}

          {/* 리액트 학습 */}
          <Route path={REACT_STUDY_PATH} element={<ReactStudy />} />
        </Route>
      </Routes>
    </>
  );
}

export default App; 