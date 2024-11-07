/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import React from 'react'
/**
 * 1
 * emtion 라이브러리 
 * css - in - js 스타일을 제공하여 React 컴포넌트 스타일 적용하는 방법 
 * 
 * css-in - js: JS안에서 스타일을 작성하게 해주는 방식 
 * (바벨 플로그인 -선택 상항 :타입지원을 위해 설치 )
 * 
 * emotion 기본 구성 
 * @Emtion./react emtion의 핵심 패키지 ,css 함수와 테마 기능등을 제공 
 * 
 * @Emtion/styled : styled-components와 유사하게 스타일링 할 수 있게 도와주는 패키지 
 * 1) 기본 사용법 css 함수 
 * :css 헬퍼를 사용하여 스타일을 작성 
 * 2) styled함수 
 */
const butttonStyle =css`
  background-color: #007bff; 
  color: white; 
  padding :8px 16px; 
  border: none;
  border-radius : 4px;
  margin: 4px;
  &:hover{
    background-color: #0056b3;
  }
`;

const StyledDiv = styled.div`
   background-color: #007bff; 
  color: white; 
  padding :8px 16px; 
  border: none;
  border-radius : 4px;
  margin: 4px;
  &:hover{
    background-color: #0056b3;
  }

`
/**
 * 5 동적 스타일링-ts로 타입을 정의화여 동적 스타일 
 * 
 */
const buttonStyle = (status : boolean) => css `
  background-color: ${status? 'green ': 'red'}; 
  color :white
`;
/**
 * 6.프로젝트 초기 스타일링 
 * Global styled를 사용하여 초기 컴포넌트에 대한 스타일을 지정 
 * 
 */
const globalStyles = css`
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: "#d2ff9b"
}
`;
export default function G_Emotion() {
  return (
    <>
    <Global styles={globalStyles}/>
    <div css ={butttonStyle}>
      HELLO EMOTION
    </div>
    <StyledDiv>
    hellow  EMOTION2
    </StyledDiv>
    <hr />
    <button css ={buttonStyle(true)}>HELLO DYNAMIC EMOTION</button>
    <button css ={buttonStyle(false)}>HELLO DYNAMIC EMOTION</button>

    <hr />

    </>

  )
}
