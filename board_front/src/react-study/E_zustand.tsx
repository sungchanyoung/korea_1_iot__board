import React from 'react'
import useCountStore from '../stores/count.store';
import { text } from 'stream/consumers';
import useCartStoreType from '../stores/cart.store';
/*
  ! zustand: 전역 상태 관리- 상태 와 액션 
  1.개념: 상태를 의미- React에서 사용되는 전역 상태 관리 라이브러리 중 하나 
  
  2.장점 :간결성, 구독 최적화 , 유연성, 접근성 

  3.zustand의형태(typescript 기준)
  -create 함수를 사용하여 스토아(store) 생성 
  : 해당 스토어를 통해 프로젝트 전역에서 데이토 접근 가능 
  -create 함수에 제네릭 <>을 사용하여 함수 구조를 정의 
  : 전역 상태값(필드), 전역 상태 설정 함수 

  -create 함수 내의 구조 
  : set 함수를 통해 상태를 업데이트 
  (set) => ({해당 구조 내에서 제네릭 구조를 작성})

  */



export default function E_zustand() {
  // state 
  //state : count  값에 대한 전역 상태 관리 //
  //객체가 반환  -  구존 분해 할당(우황에서 좌항으로)
  const{count, increment, decrement} =  useCountStore();
  const {items, addItem, removeItem, clearCart} =useCartStoreType();
  //return: zustand 전역 상태 관리에 대한 출력 
  return (
    <div style={{
      textAlign: "center",
      marginTop:"20px"
    }}>
      <h2>Zustand: Counter Example</h2>
      <p>{`Count: ${count}`}</p>

      <h2>Zustand : Cart Example</h2>
      <ul>
        { //타입 추론tS의 기능 
          items.map((item)=> (
            <li key={item.id} style={{marginBottom:'10px'}}>
                {item.name} - ${item.price} X {item.quantity}
              <button onClick={() => removeItem(item.id)}
                style={{marginLeft:"10px", padding:"3px 5px"}}>
                삭제
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
