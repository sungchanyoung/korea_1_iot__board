
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { userInfo } from 'os';
import axios from 'axios';

interface UserInfo{//일회성  객체 생성을 하기 위해
  email: string; //사용자 이메일
  password : string; // 사용자 비밀번호 
  confirmPassword : string ;// 비밀번호 확인 필드 (비밀번호와 일치해야함)

}
interface Erros{
  email?: string; // email? :String:이메일과 관련된 오류 메시지룰 저장할 선택적 문자열 속성
  password? : string ; 
  confirmPassword?: string; 
  form?: string;//전체 폼 오류 메시지(서버 오류 등 ) 
}

export default function SignUp() {

  const [ UserInfo, setUserInfo] =useState<UserInfo>({
    email :'',
    password: '',
    confirmPassword:''

  });
  //errors 유효성 검사 오류 메시지를 관리(저장)
  const [errors,setErrors] = useState<Erros>({});
  
  const navigate = useNavigate();//컴포넌트 내에서 페이지 이동
  
  // 이벤트 핸들러 
  //상용자 입력 필드 변경 이벤트 핸들러 
  const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const element =e.target;

    setUserInfo({
     ...UserInfo,
      [element.name] : element.value
    });
  }; 
   //회원 가입 버튼 클릭시 이벤트 핸들러 
   const handleSignUp = async() =>{
      const isValidation  =validateForm(); 
      if(isValidation){
        try{
          //서버에 회원가입 요청(post)
          const response = await axios.post(`http://localhost:8080/api/v1/auth/signUp`,UserInfo); 
          if(response.data){
            navigate('/'); 
          }else{
            setErrors(prev => ({
              ...prev,
              form: '회원가입에 실패 했습니다 '
            }));
          }
        
        }catch{
          setErrors(prev => ({
            ...prev, 
            form :'서버 에러가 발생하였습니다'
          }))
        }
      } 
   };
  const  validateForm  =() => {
    //임시 오류 객체 생성
    let tempErrors : Erros ={}; 
    tempErrors.email =UserInfo.email ?'':"이메일을 입력해주세요 "; 
     tempErrors.password =UserInfo.password.length>=8? '' 
     : "비밀번호 8자 이상이어야 합니다"; 
     tempErrors.confirmPassword =UserInfo.confirmPassword === UserInfo.password?'' 
     : "비밀번호가 일치 하지 않습니다"; 

     setErrors(tempErrors); 

     return Object.values(tempErrors).every(x =>x === '');
  }

 
  return (
   <Card variant='outlined' sx={{width: 360, m:'auto', mt:4}}>
    <CardContent>
      {/* 회원가입 제목 표시 */}
      <Typography variant='h5' mb={2}>
        회원가입
      </Typography>
      {/* 입력 필드 */}
      <TextField
        label ="이메일"
        type='email'
        name='email'
        variant='outlined'
        value={UserInfo.email}
        onChange={handleInputChange}
        fullWidth
        margin='normal'
        //!!데이터 값 
        //: 값을 불리언 타입으로 변환하는 방식 
        //값이 존재 하지 않으면 false로 변환 
        error={!!errors.email}
        helperText ={errors.email}
/>
<TextField
        label ="비밀번호"
        type='password'
        name='password'
        variant='outlined'
        value={UserInfo.password}
        onChange={handleInputChange}
        fullWidth
        margin='normal'
        //!!데이터 값 
        //: 값을 불리언 타입으로 변환하는 방식 
        //값이 존재 하지 않으면 false로 변환 
        error={!!errors.password}
        helperText ={errors.password}
/>
<TextField
        label ="비밀번호 확인"
        type='password'
        name='confirmPassword'
        variant='outlined'
        value={UserInfo.confirmPassword}
        onChange={handleInputChange}
        fullWidth
        margin='normal'
        //!!데이터 값 
        //: 값을 불리언 타입으로 변환하는 방식 
        //값이 존재 하지 않으면 false로 변환 
        error={!!errors.confirmPassword}
        helperText ={errors.confirmPassword}
/>
    {/* 전체 품 오류 메시지가 있을경우 표시  */}
    {/* {errors.form  있으면 errors.from 출력} */}
    {errors.form && (
      <Typography color='error' mt={2}>
        {errors.form}
      </Typography>
    )}
    </CardContent>
    {/* 회원가입 버튼  */}
    <CardActions>
      <Button onClick={handleSignUp}
        fullWidth
        variant='contained'
        color='primary'
      >
        가입하기
      </Button>
    </CardActions>
   </Card>
  )
}
