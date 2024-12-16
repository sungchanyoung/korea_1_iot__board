import React, { useState } from 'react'

export default function props(props) {
  console.log(props)
  const [age, setAge] = useState(props.age);   
  return (
    <div>
      <Hello age={10}/>
      <Hello age={20}/>
      <Hello age={30}/>
    </div>
  )
}
