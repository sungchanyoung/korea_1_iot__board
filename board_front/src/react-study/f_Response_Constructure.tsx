import axios from 'axios';
import React from 'react'
import SignIn from '../views/Authentication/SignIn';
/**
 * spring 응답 구조 
 * 
 * ResponseEntity<ResponseDTo<실제 응답데이터>>
 * 
 * 1) ResponseEntity구조 
 * --> httpStatus:응답의 성공, 실패 상태를 나타냄 (200=ok, 404 =not found, 500 = internerserver error)
 * --> httpheader: 응답에 포함할 추가정보 (content- type, authorization 등 )
 * -body(본문 ):클라이언트에게 전달할 실제 데이터 , 객체나 문자열 또는 Dto등 다양한 데이터 타입 설정이 가능
 * >> ResponseDto형식의 구조화된 본문을 전달(응답 데이터를 감싸는 형태의 응답 구조 ) 
 * -=데이터만 아니라 성공 여부 , 메시지 
 * 
 * 2)ResponseDto 구조 
 *  -result(boolean ):성공 ,실패에 대한 boolean 타입의 데이터 
 *  - messsage(string):성공 , 실패에 대한 구체적인 메시지 전달 
 *  - data(D : 클라이언트에게 전달할 실제 데이터 
 * 
 * 
 *2 프론트 엔드의 axios응답 처리 
 * 
 * response.data.data
 * 
 * Response 구조 
 * :axios가 http응답을 처리한 후 반환하는 객체 
 * -response.status : http상태 코드(200,204...)
 * -response.status.Text: 상태 텍스트('oK', 'not found'...)
 * - response.headers: 응답 헤더 정보 
 * - response.config 응답 설정 정보 
 * - response.data : 서버에서 전송한 응답 데이터 
 * 
 * 2)response data 구조 
 * : 백엔드의  전체 Response 객체를 가리킴 
 *  - 실제 데이터를 data필드로 감싸고 있음 
 * 
 * 
 * axios: 브라우저 와node.js를 위한 promise 기반의 http클라이언트 
 * 라이브러리(주로 RESTfulAPI 와 상호 작용에 사용된다 )
 */


export default function f_Response_Constructure() {
  
  const SignInSuccessResponse =(data: any) => {
    
  
  }
  
  //event  handler :로그인  버튼 클릭 이벤트 처리 함수 
  const handleSignIn = async() =>{

    const credentials ={
      email: "zkzk7290@naver.com",
      password: '12341234'
    }; 

    if(!credentials.email || !credentials.password){
      console.error("아이디와 비밀번호 모두 입력 해주세요")
      return ;
    }
    try{
      const response =  await axios.post("http://localhost8080/api/v1/auth/signIn",credentials); 
      if(response.status === 200){
        //응답에 대한 상태가 200 성공일 경우 
        SignInSuccessResponse(response.data.data); 
      }
    }catch{
      console.error("로그인 중 문제가 발생 하였습니다")
    }
  }
  return (
    <div>
      
    </div>
  )
}

