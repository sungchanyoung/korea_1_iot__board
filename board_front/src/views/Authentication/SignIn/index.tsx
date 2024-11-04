import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/user.store';

// Interface : 
//사용자 입력 정보의 상태를 나타냄 
//credential:자격증 ,신원정보
interface Credentials{ 
  email: string; 
  password : string; 

}

//로그인후 전역 상태에 저장될 사용자 데이터를 나타냄 
interface UseAuthData{
  id: number; 
  email: string;
}

//서버에서 반한하는 로그인 응닫데이터 형태를 나타냄 
interface SignInResponseDto {
  token :string; 
  user: UseAuthData; 
  exprTime: number;  
}

// 로그인 컴포넌트 : Main Component 
export default function SignIn() {
  // State모음 
  //로그인 된 사용자 정보를  컴포넌트 내에서  관리하는 state 
  // const [user, setUser] = useState<Credentials>({
  //   email:"",
  //   password:'',
  // });
  

  //State :로그인 입력 필드 상태 
  const[credentials,setCredentials] =useState<Credentials>({
  email: '',
  password: ''
});


// state: 오류 메시지를 저장할 상태 
const[error, setError] =useState<string>(''); 

//state:ReactCookie훅을 사용하여 쿠키를 설정하는 함수 
const [,setCookies] = useCookies(['token']); 

//state :setUserStore()훅을 사용하여 사용자 정보를 전역 상태에 저장 
const{login} =useAuthStore();
// Hooks: 기능 정의 
// useNavigate 훅 : 페이지 전환 
const navigate = useNavigate(); 


//  function:  로그인 성공시 실행 되는 함수 
//   SignInSuccessResponse
//  서버 응답이 성공일 경우 토큰과 사용자 정보를 저장 & 페이지 이동 
const signInSuccessResponse =(data :SignInResponseDto) => {
  if(data){
    const {token,exprTime,user} = data; 
    setToken(token,exprTime); 
    login({
      id: user.id,
      name: user.email
    }); 
    navigate('/'); 
  }else{
    setError('로그인 실패: 인증 정보룰 확인해주세요')
  }
}

//인증 토큰을 저장하는 함수 
const setToken =(token : string ,exprTime : number) =>{
  const expires = new Date(Date.now()+exprTime); 
  setCookies('token',token,{
    path: '/',
    expires
  });

}

//*Event Handler//
//이벤트 핸들러 : 로그인 입력 필드 입력 이벤트 처리 함수 
const handleInputChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
  const element =e.target; 

  setCredentials({
    ...credentials,
    [element.name]:element.value
  })
}
  //로그인 버튼 클릭 이벤트 처리 함수 
  //
  const handleSignIn = async() =>{
    const {email, password} =credentials;
    //이메일 O +passwordO : fasle
    //이메일 O +passwordX : true
    //이메일 X +passwordO : true
    //이메일 X +passwordX : true
    //403 Forbidden :서버 오류 -> 요청 거부 

    
    if(!email || !password){
      //이메일
      setError('아이딛와 비밀번호를 입력해주세요'); 
      return; 
    }
    try {//데이터 다올때 까지 기다림  - credentials가지고 가라 
      const  response = await axios.post(`http://localhost:8080/api/v1/auth/signIn`,credentials )

      if(response.data){
        //user token expirtime 반환 -> 이부분을 이해 되는지 ?? 
        signInSuccessResponse(response.data.data);
      }

    } catch  {
      setError("로그인 중 문제가 발생했습니다")
    }
  };
  const handleSignInSuccess = (data: SignInResponseDto) => {

  }
   
//render:로그인 컴포넌트 랜더링 // 
  return (
  <Card variant='outlined' sx={{
    width: 360, 
    m:'auto',
    mt:4
  }}
  > 
  <CardContent>
    {/* 자식 컴포넌트 한테 겂을 대입 시킬수 없다 */}
    <Typography variant='h5' mb={2}>
      로그인 
      </Typography>
    <TextField
        label ="이메일"
        type='email'
        name='email'
        variant='outlined'
        value={credentials.email}
        onChange={handleInputChange}
        fullWidth
        margin='normal'
        //!!데이터 값 
        //: 값을 불리언 타입으로 변환하는 방식 
        //값이 존재 하지 않으면 false로 변환 
      
/>
<TextField
        label ="비밀번호"
        type='password'
        name='password'
        variant='outlined'
        value={credentials.password}
        onChange={handleInputChange}
        fullWidth
        margin='normal'
        //!!데이터 값 
        //: 값을 불리언 타입으로 변환하는 방식 
        //값이 존재 하지 않으면 false로 변환 
        
/>
    {error && (
      <Typography color='error' mt={2}>
        {error}
    </Typography>
    )}
    <CardActions>
      <Button onClick = {handleSignIn} 
      fullWidth 
      variant = 'contained'
      color='primary'>
        로그인
      </Button>
    </CardActions>
  </CardContent>

  </Card>
  )
}

