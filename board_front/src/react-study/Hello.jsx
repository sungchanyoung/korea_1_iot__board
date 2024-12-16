
import React, { useState } from 'react'

export default function Hello(props){
//이부분에 props넣어준다 
//props는 속성 값이다 
console.log(props);
  const [name,setName] =useState("mike");
  //props.age를(넘겨 받은 age)를 강제로 변환 시켤려고하면 typeError가 뜬다
  const [age,setAge] =useState(props.age);

  return (
    <div>
      {/* props.name은 변경이 안된다 변경 하고 싶으면 useState을 사용해서 변경해야한다  */}
      <h2 id='name'>{name}({age})</h2>
      <button
      onClick={() => {
        setName(name === 'mike'? 'jane':'mike');
        setAge(age+1)
      }}
      ></button>    
    </div>
  )
}
