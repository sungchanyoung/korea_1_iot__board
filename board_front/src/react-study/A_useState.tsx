import React, { useState } from 'react'
// useState 함수형 컴포넌트 --> 
//2 상태 관리 
//3 Hook 

//Hook: 리액트 함수형 컴포넌트에서 사용할 수 있는 기능 모음 
//문법 체계가 'use-'로 시작 
//useState로는 파일 간에 상태관리 못한다

//useState 사용법 
//const [state, setState] = useState<타입>(초깃값) => 배열로 반환 

//useState의 리턴값
//: [상태 변수 ,상태 업데이트 함수]

//const 상태 변수  = 초기값 ; 
//const 상태업데이트함수 = () => {
// }

// 

//구조 분해 활당 
// 배열이나 객체의 속성을 변수로 쉽게 추출할 수 있도록 하는 기능 
//let vs const 
const [a,b] = [1,2];
const { name, age } = {
  name: '이승아',
  age: 30
};

// const a= 0;
interface loginState{
  email:string; 
  password :string;
}
//매개변수e  -> 이벤트 객체 : 요소등등 특징 ,어디서 
//const {name,value} =e.target;
//html  요소 -> js(ts)DOM 객체 
//객체의 속성에 접근하는 방법 a.~~~이렇게  
export default function A_useState() {  //요기서 
  const [ count, setCount] = useState<number>(0); 
  const [loginState, setLoginState] = useState<loginState>({
    email: " ",
    password : " "

  });
  //구조 분해 할당이  이루어짐 
  const { email, password} = loginState;
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
  //여러 input 창을 관리하는 이벤트 핸들러 
  const handleInputChange =(e : React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} =  e.target

    setLoginState((prevState) => ({
      
      ...prevState,
      //이메일 input 창만 이벤트 발생시 이전의 이메일 
      //이전 상태를 그대로 복사 :email값, password 값을 그대로 유지 
      //현재 변화가 일어나고 있는 name(email)에 value (입력값)를 넣어 업데이트 

      //password는 이전의 값을 그래도 가지고 있음
      [name]: value

    }))
  }

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={handleIncrementButton}>증가 버튼</button>
      <form>
        <div>
          <label htmlFor='email'>이메일</label>
          <input type='email' id='email' value={email} name='email' onChange={handleInputChange} 
          placeholder='이메일을 입력하세요' required/>
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input type='password' id='password' value={password} name='password' onChange={handleInputChange} 
          placeholder='비밀번호을 입력하세요' required/>
        </div>
      </form>
    </div>
  )
} //요기까지
