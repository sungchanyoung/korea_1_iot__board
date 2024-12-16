import React, { useState } from 'react'

//버튼으로 이름 바꾸기 
export default function useState01() {
const [name, setName] =useState('mike');

function changeName(){
  const newName = name === "mike" ? "Jane" : "Mike";
  setName(newName);
}
  return (
    <div>
      <h1>State</h1>
      <h2>{name}</h2>
      <button onClick={changeName}>Change</button>      
    </div>
  )
}
