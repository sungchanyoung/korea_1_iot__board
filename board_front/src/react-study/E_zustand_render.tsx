
import React, { useState } from 'react'
import useCountStore from '../stores/count.store'
import useCartStoreType from '../stores/cart.store';

export default function E_zustand_render() {
  //state: 입력 되는 새로운 아이템에 대한 상태 관리 
  const [newItem,setNewItem] =useState({
    id:0,
    name:'',
    price: 0,
    quantity: 1
  })

  // state 
  //# zustand: count 값을 전역상태 관리 
  //데이터를 어떻게 운영할지 명시해야 한다 
  const {increment,decrement} = useCountStore(); 

  //zustand :cart 값을 전역 상태 관리
  const{addItem,clearCart} = useCartStoreType();

  //event handler: 새로운 장바구니 아이템 입력 상태  관리 //
  //- 하나의 핸들러로 관리 
  const handleCartInputChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: name === 'price' || name === 'quantity' ?  Number(value) : value
    }))
  }
//#event handler:새로운 장바구니 아이템 생성 버튼 클릭 이벤트 핸들러 
const handleAddItem =()=>{
  if(newItem.name && newItem.price >0){
    addItem({
      ...newItem,
      id: Date.now()
    
    });//임시로 현재 시간 기반 ID 생성 
    setNewItem({
      id:0,
      name: '',
      price:0,
      quantity:1
    })
  }
}

  return (
    <div style={{
       textAlign:'center',
      marginTop:'20px',
      background:"lightblue"
    }}>
      <h2>Zustnad Redener : Counter 상태를 변경하는 버튼</h2>

      <button onClick={increment} style={{
        marginRight :'10px',
        padding:'15px 20px'
      }}>증가</button>  

      <button onClick={decrement} style={{
        marginRight :'10px',
        padding:'15px 20px'}}
        >감소</button>  

        <h2>Zustand Render: Cart상태를 변경하는 input</h2>
        <div style={{padding:'20px', maxWidth:'400px', margin:'0 auto'}}> 
          <h3>shopping Cart</h3>
           
            <div style={{marginBottom :'20px'}} >
              <input type="text" 
              placeholder='메뉴명'
              name='name'
              value={newItem.name}
              onChange={handleCartInputChange}/>
              <br />
              <input type="text" 
              placeholder='메뉴가격'
              name='price'
              value={newItem.price}
              onChange={handleCartInputChange}/>
              <br />
              <input type="text" 
              placeholder='메뉴수량'
              name='quantity'
              value={newItem.quantity}
              onChange={handleCartInputChange}/>
              <br />
            <button onClick={handleAddItem}
            style={{padding:'5px 10px',
              marginTop:'10px'
            }}>새로운 장바구니 아이템 추가</button>
            <button onClick={clearCart} style={{padding: '5px 10px',
              marginTop :'10px',
              marginLeft :'10px'
            }}>
               장바구니 전체 삭제 
            </button>
            </div>
          </div>
      </div>
        )
      }
