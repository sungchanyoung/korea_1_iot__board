//count.store.ts: 카운트값 전역 상태 관리 

import { create } from "zustand";

// interface  스토어(전역 저장소)의 interface 정의  
interface CountStoreType{
  //상태 필드 정의 
  count: number; 
  //상태 업데이트 함수 
  increment: () => void;
  //  increment: () => void 들어가 있는 이유 해당 인터페이스를 구현하는 객체가 
  // 반드시 그함수를  제공 해야하기 때문에
  decrement: () => void;

}
 // 저장소 생성 함수 : create<저장소 구조 interface>();
 // 객체다 
 const useCountStore = create<CountStoreType>((set) => ({
  //상태 필드 초기화 
  count:0,//상태
  increment: () => set((state) => ({//액션 
    count : state.count+1
  })),
  decrement: () => set((state) => ({
    count: state.count *2
  }))

})); 

export default useCountStore;
