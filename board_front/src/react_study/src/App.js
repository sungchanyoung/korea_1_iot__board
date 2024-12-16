import { useEffect, useState } from 'react';
import './App.css';
import useState01 from './useState/useState01';
// 상태 변화를 체크 할려면 useEffect를 사용해야 한다.ㅍ
function App() {

  const[data, setData] = useState("상태값 1");

  useEffect(() =>{ //useEffect는 실행 되었지만  안에 있는 clg은 아직이다 -리턴된 이후 
    console.log("랜더링 끝")
  })
  console.log("랜더링 시작")
  const getUser = async() => {
    try{
      const response = await axios.get("http://localhost8080/api/v1/user/"+ userId)
      setData(response.data);
      console.log(data) //이 출력이 안된다 
    }catch(error){
      console.error(error);
    }
  
  }

  return (
    <div>
      <useState01/>
    </div>
  );
}

export default App;
