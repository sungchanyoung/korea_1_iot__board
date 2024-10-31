
import path from 'path';
import React from 'react'
import { useCookies } from 'react-cookie';
/*
react-cookie
React에서 쿠키를 쉽게 관리 할수 있도록 도와주는 "라이브러리 "
-쿠키의 생성 ,접근 ,수정, 삭제 기능 담당 
<<설치 명령어>>
npm i --save @types/reac/cookie

<<기본 사용법 >>
react-cookie 는 useCookie 훅을 통해 
쿠키(cookies),쿠키 설정 함수 (setCookie) 쿠키제거 함수(remove)를 반환 
const [cookie,setcookie, removecookie]
 = useCookie(['쿠키 이름 '])

 cf) useCookies 훅에 전달되는 배열(인자 값)
 :배열로써 관리하고자 하는 쿠키의 이름을  전달 
 : 사용자가 현재 컴포넌트에서 접근하려는 쿠키이름을 지정하는 역할 
 : 쿠키에 대한 접근 : 'cookie.쿠키이름'을 통해 쿠키값을 반환 

 //react-cookie 옵션 설정  선택 
 path : 쿠키가 유효한 경로를 지정 
 - 주로'/'를 설정하여 모든 경로에서 유효 하도록 쿠키를 설정 
 expires : 쿠키의 만료 시간을 설정
 -특정 날짜와 시간 경과 후 만료 되도록 설정 

 maxAge: 쿠키의 유효 시간을 초 단위로 설정 
- 현재 시간부터 지정한 시간동안 쿠키가 유지 
  (생성된 지점으로부터 시간을 기준으로 유효 시간 설정)

 secure:  true로 설정시 HTTPs에서만 쿠키가 전송 
 sameSite: 쿠키가 전송될 조선을 제한 
 - 'strict'다른 사이트에서 요청에서는 쿠키가 포함 되지

 */

export default function D_react_cookie() {
  const [cookies,setCookie,removecookie] = useCookies(['user']);

  const handleClickCookie =()=>  {
   //setCookie('쿠키이름',쿠키값,옵션 설정- 선택 )
   setCookie('user','이승아',{
    path:'/',
    //new Date(): 새로운 날짜 지정 
    // -Date.now() : 현재 날짜를 반환 -밀리초 단위 
    //1000* 60 *60 *24 =1일 
    expires: new Date(Date.now()+ 1000* 60 *60 *24)
    });

  }

  const handleRemoveCookie= ()=>{
    //removeCookie('쿠키이름',옵션 설정 -선택)
    removecookie('user',{path: '/'})
  }  
  return (
    <div>
      <button onClick={handleClickCookie}>쿠키 설정 버튼</button>
      <button onClick={handleRemoveCookie}>쿠키 삭제 버튼</button>

      User Cookie: {cookies.user}
    </div>
  )
}
