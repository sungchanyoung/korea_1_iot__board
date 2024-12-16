

function Promise1() {
  

  
  new Promise((rs,rj) => {// 프로미스 비동기인데 
    
    console.log("프로미스 생성")
    rj();
  }).then(() => { //언제 동작을 하는지 then안에 함수를 등록하기 위해서 실행  1
    //then은 Promise를 리턴한다
    //비동기에서 동기로 실행 한다
    console.log("then 실행1")
  
  }).then(()=>{ //2
    console.log("then1-1 실행")
  }).catch((error)=>{ // catch는 비동기 중에서 맨 나중에 실행 
    console.error("오류 났음");
    
  });
  
  console.log("외부에서 실행")

  const n = 10;

  new Promise((rs,rj) => {// 프로미스 비동기인데 
    console.log("프로미스 생성2")
    if(n%2 ==0){
      rs(10);
    }else{
      rj(new Error());
    }
    rs(10);
  }).then((num) => { //언제 동작을 하는지 then안에 함수를 등록하기 위해서 실행  1
    //then은 Promise를 리턴한다
    console.log("then 실행2")
  
  }).then(() => {
    console.log("then 실행 2-2")
  })

  return<></>
}
export default Promise1;