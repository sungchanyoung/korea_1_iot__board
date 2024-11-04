
import React from 'react'
import useCountStore1 from '../stores/ex01'

export default function ex01() {
  //상태 스토어를 가져오는 역활 
  const {increment,doubIncrement} = useCountStore1(); 
  return (
    <div style={{
      textAlign:'center',
      marginTop:'20px',
      background:"lightblue"
    }}>
      <h2>zustand 상태 변경하는 버튼</h2>
      <button onClick={increment} style={{marginRight:'10px',
        padding:'15px 20px'
      }}>증가</button>
      <button onClick={doubIncrement} style={{marginRight:'10px',
        padding:'15px 20px'
      }}>두배 증가</button>
    </div>
  )
}
