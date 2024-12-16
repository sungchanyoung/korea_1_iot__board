import { error } from "console";

//async는 자동적으로 반환 Promise 이다
async function getUser(url,option){
  if(url === ""){
    throw new Error("오류!!")
  };
  return {url,option};
}

async function getUser3(url,option){
  try{
    const response = await getUser(); 
    setTimeout(() => {
      getUser2(response.url, response.option);
    },1000)
   
  }catch(error){
    console.error(error);  
  }
}

function getUser2(url,option){
  if(url === ""){
    rj("오류!!")
  };
  rs({url,option});
}


function AsyncAwait(){
  //프로미스 객체라서 then을 찍을수 있다
  getUser2("http://localhost8080/api/v1/user", {params : {}})
  .then(response => {
    getUser(response.url, response.option).then(reponse => {
      getUser2(response.url,response.option)
    });
  }) 
  .catch(error => console.error(error));

  return<></>
}


export default AsyncAwait;