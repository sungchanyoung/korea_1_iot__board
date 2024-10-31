import React, { useState } from "react";
import useAuthStore from "../../../stores/user.store";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useThemeStore from "../../../stores/theme.store";


export default function Header() {
  /**상태 관리 사이트 State */

  //사용자의 토큰을 관리하는 쿠키 
  const {  isAuthenticated, user, logout } = useAuthStore();

  const {theme, toggleTheme} =useThemeStore();


  const[,setCookies] =useCookies(['token'])
  //이벤트 핸드러 : 로그아웃 버튼 클릭시 이벤트 핸들러 
  const handleLogoutClick =( ) => {
    logout();
    setCookies('token','',{expires: new Date()}); 
    logout();
  }
  return (
    <div>
      <Box 
        display ='flex' justifyContent= 'space-between' p={2}>
        <Box 
        flex={1}
        display='flex'
        justifyContent='center'
        >
        <Button variant="contained" onClick={toggleTheme}>
           {theme === 'light' ?'다크모드':'라이트 모드 '}
        </Button>
        </Box>

        <Box 
          flex={1} display='flex' justifyContent='center' alignItems='center' textAlign='center'>
          <Link to={''} style={{
            textDecoration :'none',
            color:'inherit'
          }}>
            <Typography variant="h3" >코리아 IT</Typography>
          </Link>
        </Box>
        <Box flex={1} display='flex' justifyContent='flex-end'>
          {isAuthenticated? (
            <Typography
              variant="subtitle1"
              m={2}
              onClick={handleLogoutClick}
            >로그아웃</Typography>
          ):(
            <Link to={'/auth'}
            style={{
              textDecoration :'none',
              color:'inherit'
            }}>
              <Typography 
                variant="subtitle1"
                m={2}>
                로그인 
              </Typography>
            </Link>
          )}
        </Box>
      </Box>
    </div>
  );
}
