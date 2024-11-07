import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import axios from 'axios';
import useAuthStore from '../../stores/user.store';
import useThemeStore from '../../stores/theme.store';
import { Cookies, useCookies } from 'react-cookie';
interface Post{
  id: number; 
  title: string; 
  content: string; 
  author: string;
}
/*
 * component 폴더 -header 폴더(랜더링 시 토큰 값 확인 하여 인증 상태 수정) 
 *
 */

export default function Board() {
  const [posts,setPosts] = useState<Post[]>([]);
  const [currentPage,setCurrentPage] =useState<number>(0);
  const [totalPages,setTotalPages] =useState<number>(1);
  const [cookies] = useCookies(['token']); 


  const fetchPosts = async(page: number) => {
  //javaSCript에서 쿠키에 저장된 token값을 접근하는 방법 ->일반적으로 인증 토큰이나 사용자, 
  // 세션정보를 쿠키에 저장해 -> 이 값을 서버요청시 사용해  
    const token = cookies.token; 

    try{
    const response = await axios.get(`/api/v1/posts? page=${page}&size=5`,{
      // 헤더에 토큰을  포함 하여 전달 
      headers: {
        Authorization : `Barer ${token}`,
      }
    });
    const data = response.data.data;

    setPosts(data.content); 
    setTotalPages(data.totalPages); 
   
  }catch(e){
    console.error('Failed to fetch posts data',e);
   }

  }
    
    useEffect(() => {
      fetchPosts(currentPage);
    },[currentPage])

  const handlePageClick = (page: number) =>{
    setCurrentPage(page);
  }
  const handlePreSectionClick =() =>{
    if(currentPage >0){
      setCurrentPage(currentPage -1);
    }
  }
  const handleNextSectionClick =() =>{
    if(currentPage< totalPages-1){
      setCurrentPage(currentPage+1);
    }
  }
  return (
    <div>
       게시판 목록 화면

<h2>게시판 목록</h2>
 {/* 동적으로 리스트 생성하는 예시 */}
<ul>
  {posts.map((post) => (
    <li key={post.id}>{post.title}</li>
  ))}
</ul>

<Pagination 
  pageList={Array.from(Array(totalPages).keys())}
  currentPage={currentPage}
  handlePageClick={handlePageClick}
  handlePreSectionClick={handlePreSectionClick}
  handleNextSectionClick={handleNextSectionClick}
/>
    </div>
  )
}
