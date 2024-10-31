//variable 상대  경로 상수 // 
//- 출력 되는 화면에 pathVariable(동적인 데이터값)이필요 없는 경우 :t상수(변수)
//-출력되는 화면에 pathVariable (동적인 데이터 값이 )필요한 경우 
//매개변수 데이터값을 받아 템플릿 리터럴로 명시하는 함수 

export const MAIN_PATH ="/";
export const AUTH_PATH ="/auth";
export const BOARD_DETAIL_PATH = (boardNumber : number | String) => `/board/detail /${boardNumber}`
export const BOARD_WRITE_PATH ="/board/write";
export const BOARD_UPDATE_PATH =  (boardNumber : number | String) => `/board/update /${boardNumber}`
export const USER_PATH ="/user";
export const REACT_STUDY_PATH ="/react-study";
//outlet: