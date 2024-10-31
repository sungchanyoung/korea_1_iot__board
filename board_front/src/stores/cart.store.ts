import { create } from "zustand";


//장바구니 아이템의 interface정의 
interface CartItem{
  id: number//장바구니 아이템들의 고유값
  name: string; //상품명 
  price: number; //가격
  quantity: number;//갯수 :
}
//* interface: 스토어(전역 저장소)의 interface정의 
interface CartStoreType{
  // 상태 필드 정의 
  items:CartItem[];

  addItem: (item: CartItem) =>void; 
  removeItem: (id: number) =>void;//단건 아이템 삭제 
  clearCart: () =>void; //전체 아이템 삭제 
}
//저장소 생성함수 
const useCartStoreType =  create<CartStoreType>((set) => ({
  // 상태 필드 초기화 
  items: [],
  //상태 업데이트 함수 정의 
  //이전 상태를 가지고 와야함 
  addItem: (item) => set((state) => ({
    items:[...state.items, item]
  })) ,
  removeItem:(id) => set((state) => ({
    items : state.items.filter((item) => item.id !== id)
  })) ,
  clearCart: () => set({items : []}),
})); 
export default useCartStoreType;