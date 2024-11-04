import { create } from "zustand";

interface CountStoreType{
  count : number; 
  
  increment: () => void ; 
  doubIncrement: () => void; 
}

//저장소 생성 함수: create<저장소 구조   interface>(); 
const useCountStore1 =create<CountStoreType>((set) => ({
  count :0,
  increment: () => set((state) => ({
    count : state.count+ 1
  })),
  doubIncrement: () => set((state) => ({
    count: state.count *2
  }))
}))
export default useCountStore1