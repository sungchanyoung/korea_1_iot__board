import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import { useTheme } from '@emotion/react'
import { Box } from '@mui/material';
import useThemeStore from '../../stores/theme.store';
import { AUTH_PATH } from '../../constants';
import Footer from './Footer';

/*
1 outlet컴포넌투 
:라우트 계층 구조에서 상위 라우트 자식 컴포넌트 랜더링 역할 
-outLet이 위치한 곳에 자식 라우트가 표시 
-상위 라우트의 레이아웃을 공통으로 사용하여 + 자식 라우트만의 컴포넌트를 랜더링 
*/

export default function Container() {
  const { pathname } = useLocation();
  const{theme} =useThemeStore();


  return (
    <>
    <Header/>
    <hr />
    {/*  저삭 컴포넌트가 해당 위치에서 랜더링  */}
    
    <Box 
      sx={{
        flex:1,
        minHeight: '80vh',
        backgroundColor: theme ==='light' ? 'withe': 
        'grey.900',
        color: theme === 'light' ? 'black': 'white',
        display: 'flex',
        flexDirection :'column',
        alignItems: 'center',
        justifyContent :'center',
        padding:2
      }}
      >
      <Outlet/>
    </Box>
       {/* 
        현재 경로(pathname)가 AUTH_PATH (로그인, 회원가입)이 "아니면" Footer 표시 
        : 논리 연산자 (&&, ||, !)
      */}
      {/* 
        pathname !== AUTH_PATH 
      
        1. true일 경우(일치하지 않는 경우)
        - 로그인과 회원가입 페이지 X
        - Footer 표시 O

        >> && 논리 연산자 뒤의 값을 "해석함"

        2. false일 경우(일치하는 경우)
        - 로그인과 회원가입 페이지 O
        - Footer 표시 X

        >> && 논리 연산자 뒤의 값을 "해석하지 않음"
      */}

<hr />
      { pathname !== AUTH_PATH && <Footer /> }
    {/* <Footer/> */}
    </>
  )
}
