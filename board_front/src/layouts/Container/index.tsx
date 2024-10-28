import React from 'react'
import { Outlet } from 'react-router-dom'

/*
1 outlet컴포넌투 
:라우트 계층 구조에서 상위 라우트 자식 컴포넌트 랜더링 역할 
-outLet이 위치한 곳에 자식 라우트가 표시 
-상위 라우트의 레이아웃을 공통으로 사용하여 + 자식 라우트만의 컴포넌트를 랜더링 
*/

export default function Container() {

  return (
    <>
    {/* <Header/> */}
    {/*  저삭 컴포넌트가 해당 위치에서 랜더링  */}
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}
