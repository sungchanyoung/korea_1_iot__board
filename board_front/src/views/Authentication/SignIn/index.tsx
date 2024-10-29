import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface Credentials{
  email: string; 
  password : string; 

}
interface SignInResponseDto {
  token :string; 
  user:Credentials; 
  exprTime: number;  

}
export default function SignIn() {
  const [user, setUser] = useState<Credentials>({
    email:"",
    password:'',
  })
  const[credentials,setCredentials] =useState<Credentials>({
  email: '',
  password: ''
});
  
const[error, setError] =useState<string>(''); 
//셋 쿠키 만 사용하고 싶으며ㅛㄴ ,setcookie
const [,setCookies] = useCookies(['token']); 


const navigate = useNavigate(); 

const handleInputChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
  const element =e.target; 

  setCredentials({
    ...credentials,
    [element.name]:element.value
  })
}
  const handleSignIn = async() =>{
    const {email, password} =credentials;
    //이메일 O +passwordO : fasle
    //이메일 O +passwordX : true
    //이메일 X +passwordO : true
    //이메일 X +passwordX : true
    
    
    if(!email || !password){
      //이메일
      setError('아이딛와 비밀번호를 입력해주세요'); 
      return; 
    }
    try {
      const  response = await axios.post(`http://localhost:8080/api/v1/auth/signIn/`,credentials)
      handleSignInSuccess(response.data); 
      if(response.data){
        handleSignInSuccess(response.data.data);
      }

    } catch  {
      setError("로그인 중 문제가 발생했습니다")
    }
  }; 
//  서버 응답이 성공일 경우 토큰과 상요자 정보를 저장 & 페이지 이동 
    const handleSignInSuccess =(data :SignInResponseDto) => {
        if(data){
          const {token,exprTime,user} = data; 
          setToken(token,exprTime); 
          setUser(user); 
          navigate('/'); 
        }else{
          setError('로그인 실패: 인증 정보룰 확인해주세요')
        }
    }
    const setToken =(token : string ,exprTime : number) =>{
      const expires = new Date(Date.now()+exprTime); 
      setCookies('token',token,{
        path: '/',
        expires
      });

    }
  return (
  <Card variant='outlined' sx={{
    width: 360, 
    m:'auto',
    mt:4
  }}
  > 
  <CardContent>
    <Typography variant='h5' mb={2}>
      로그인
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
</Typography>
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

