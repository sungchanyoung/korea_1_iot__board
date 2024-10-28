import React, { useState } from 'react'
// useState 함수형 컴포넌트 
//2 상태 관리 
//3 Hook 

//Hook: 리액트 함수형 컴포넌트에서 사용할 수 있는 기능으 모음 
//문법 체계가 'use-'로 시작 
//useState로는 파일 간에 상태관리 못한다

//useState 사용법 
//const [state, setState] = useState<타입>(초깃값) => 배열로 반환 

//useState의 리턴값
//: [상태 변수 ,상태 업데이트 함수]

//const 상태 변수  = 초기값 ; 
//const 상태업데이트함수 = () => {
// }

//구조 분해 활당 
// 배열이나 객체의 속성을 변수로 쉽게 추출할 수 있도록 하는 기능 
//let vs const 
const [a,b] = [1,2];
// const {name , age} {
//     name: "이승아",
//     age: 30
// };
// const a= 0;
export default function A_useState() {
  const [ count, setCount] = useState<number>(0); 
  //count가 변수명 
  
  //react의 체계 
  //tsx문법 체계 
  //ts(js)내에서 HTML을 작성 
  //함수형 컴포넌트의 반환을 HTML로 반환 
  //1 .Ts내에서 HTML작성 : ()소괄호로 묶음 
  //2.HTML내에서 TS 작성 : {} 중괄호로 묶음 
  const handleIncrementButton =()=>{
    //set 상태 설정 함수에 전달되는 인자값으로 count 값이 업데이트 된다 
    //이전의 상태와 연관이 없는 경우 
    // setCount(count+1);

    //이전 상태과 연관이 없는 경우 
    setCount(prevCount => prevCount +1); 
    
  }
  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={handleIncrementButton}>증가 버튼</button>
    </div>
  )
}
