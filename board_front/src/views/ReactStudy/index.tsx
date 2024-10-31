import React from 'react'
import UseState  from '../../react-study/A_useState'
import UseEffect from '../../react-study/B_useEffect'
import StateEffect from '../../react-study/C_StateEffect'
import ReactCookie from '../../react-study/D_react_cookie'
import Zustand from '../../react-study/E_zustand'
import Zustand_render from '../../react-study/E_zustand_render'

export default function index() {
  return (
    <>
     <h2>UseState: 상태관리</h2>
      <UseState />

      <h2>UseEffect: 부수효과</h2>
      <UseEffect />

      <h2>State & UseEffect: 검색구현</h2>
      <StateEffect />
      
      <h2>react-cookie:쿠키 상태 관리</h2>
      <ReactCookie/>

      <h2>zustand : 전역 상태관리 </h2>
      <Zustand/>
      <Zustand_render/>
      
    </>
  )
}
