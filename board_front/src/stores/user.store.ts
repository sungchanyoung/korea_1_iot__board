//zustand 파일명 권장 
// : 전역 상태 관리 할 데이터 명 .store.ts
//Ex) user.store.ts

import { create } from "zustand";
//** interface  */
//#인증 상태에저장할 사용자 interface
interface User{
  id : number;
  name: string; 

}

//인증상태의  interface정의 
interface AuthStoreType{
  isAuthenticated: boolean; //인증 여부를 나타냄 
  user :  User | null; //로그인성공:

  //상태 업데이트 함수 
  login:(user: User)  => void; 
  logout: () => void
}
//저장소 생성 함수 
const useAuthStore = create<AuthStoreType>((set) => ({
  //필드 초기화 
  isAuthenticated :false,
  user: null,
  login: (user) => set({isAuthenticated: true, user}),
  logout: () => set({isAuthenticated :false , user: null}),
}));
export default useAuthStore;
