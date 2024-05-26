import React, { useEffect, useState } from 'react';
import { getData, patchData } from '../../api/APIs';
import { ServerPost } from '../../api/ServerInterfaces';
import { PostProps } from './PostView';
import HomeView from './HomeView';
import { useAuth } from '../../auth/AuthContext';

const HomeContainer = () => {
  const { userToken } = useAuth();
  
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const getPosts = async () => {
    try {
      const path = '/feed';
      const serverData = await getData<ServerPost[]>(path, userToken);
   
      const data = serverData.map((item) => ({
        id: item.feedId,
        content: item.content,
        isPinned: item.pinned,
        userId: item.userId, 
        userName: item.userName,
        userColor: item.userColor,
        groupId: item.groupId,
        date: item.createdAt.substring(0,10),
      }));

      if (data.length > 0) {
        // 가장 최근 게시글이 피드 상단에 오게 정렬(자동으로 그렇게 옴)
        // isPinned가 true인 포스트를 상단으로 정렬
        const sortedData = data.sort((a, b) => {
          const aValue = a.isPinned ? 1 : 0;
          const bValue = b.isPinned ? 1 : 0;
          return bValue - aValue;
        });
        //정렬된 posts를 setting
        setPosts(sortedData);
      }
    } catch (error) {
        if (error instanceof TypeError) {
          // TypeError 타입의 에러 처리
          console.error('posts TypeError:', error);
        } else if (error instanceof ReferenceError) {
          // ReferenceError 타입의 에러 처리
          console.error('posts ReferenceError:', error);
        } else {
          // 다른 모든 에러 처리
          console.error('posts Unknown Error:', error);
        }
    }
  };

  const editPin = async (id: number, isPinned: boolean) => {
    try {
      // 서버에 업데이트 요청을 보냅니다.
      const updatePin = {
        pinned: !isPinned,
      }
      const path = `/feed/pin/${id}`;
      const response = await patchData(path, updatePin, userToken); // 업데이트할 데이터를 전달합니다.
      console.log('editPin 서버 응답:', response);
      getPosts(); // 게시글 목록 새로고침          
      } catch (error) {
        console.error('editPin 서버 요청 실패:', error);
      }
  }; 

  // 새로고침 동작을 처리하는 함수
  const onRefresh = () => {
    setRefreshing(true);
    getPosts(); // 데이터를 다시 가져옴
    setRefreshing(false); // 새로고침 완료 후 refreshing 상태 변경
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <HomeView 
      posts={posts} 
      getPosts={getPosts} 
      editPin={editPin}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

export default HomeContainer;

/*
const getUser = async () => {
  try {
    const path = '/user/setting';
    const serverData = await getData<
      { code: string,
        message: string,
        data: {
          userName: string,
          userColor: string,
        }
      }
    >(path, userToken);
    console.log(path, serverData);
  } catch (error) {
    if (error instanceof TypeError) {
      // TypeError 타입의 에러 처리
      console.error('posts TypeError:', error);
    } else if (error instanceof ReferenceError) {
      // ReferenceError 타입의 에러 처리
      console.error('posts ReferenceError:', error);
    } else {
      // 다른 모든 에러 처리
      console.error('posts Unknown Error:', error);
    }
  }
}
*/
