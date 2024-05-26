import React, { useState } from 'react';
import { Alert } from 'react-native';
import { postData, deleteData, patchData } from '../../../api/APIs';
import RegisterPostModalView from './RegisterPostModalView';
import { useAuth } from '../../../auth/AuthContext';

interface RegisterPostModalContainerProps {
  mode: 'create' | 'edit';
  id: number;
  postContent: string;
  isVisible: boolean;
  onClose: () => void;
  getPosts: () => void;
}

const RegisterPostModalContainer: React.FC<RegisterPostModalContainerProps> = ({ mode, id, isVisible, postContent, onClose, getPosts}) => {
  console.log('mode:', mode);
  const { userToken } = useAuth();
  
  const [content, setContent] = useState<string>(''); 
  console.log('post id:', id);
  const handleCancel = () => {
    onClose();
    setContent(''); // 모달이 닫힐 때 텍스트 필드 초기화
  };

  const addPost = async () => {
    if (content !== '') {
      // JSON 데이터 생성
      const newPost = {
        content: content,
      };
      console.log('postData will be sended: ', newPost);
  
      try {
        // addData 함수를 사용하여 서버에 POST 요청
        const path = '/feed'; // 요청을 보낼 경로
        const response = await postData<typeof newPost, any>(path, newPost, userToken); 
        console.log('addPost 서버 응답:', response);
        onClose(); // 등록 버튼 클릭 후 모달 닫기
        setContent(''); // 텍스트 필드 초기화
        getPosts(); // 게시글 목록 새로고침
      } catch (error) {
        console.error('addPost 서버 요청 실패:', error);
      }
    } else {
      Alert.alert(
        '',
        '게시글 내용을 입력하세요',
        [{ text: '확인' }],
        { cancelable: false }
      );
    }
  };

  // content 값을 업데이트하는 함수
  const editPost = async () => {
    if (content !== '') {
      try {
        // 서버에 업데이트 요청을 보냅니다.
        const updateContent = {
          content: content
        }

        const path = `/feed/${id}`;
        const response = await patchData(path, updateContent, userToken); // 업데이트할 데이터를 전달합니다.
        console.log('editPost 서버 응답:', response);

        onClose(); // 등록 버튼 클릭 후 모달 닫기
        setContent(''); // 텍스트 필드 초기화
        getPosts(); // 게시글 목록 새로고침
      } catch (error) {
        console.error('editPost 서버 요청 실패:', error);
      }
    } else {
      Alert.alert(
        '',
        '수정사항이 없으면 취소를 눌러주세요',
        [{ text: '확인' }],
        { cancelable: false }
      );
    }
  };

  const deletePost = async () => {
    try {
      const path = '/feed/'+id;
      await deleteData(path, userToken);
      console.log('deletePost 완료: ', postContent);
      onClose();
      setContent('');
      getPosts();
    } catch (error) {
      console.error('deletePost 실패:', error);
    }
  };

  const regesterPost = mode === 'edit' ? editPost : addPost;

  return (
    <RegisterPostModalView 
        mode={mode}
        isVisible={isVisible} 
        handleCancel={handleCancel} 
        setContent={setContent} 
        regesterPost={regesterPost} 
        deletePost={deletePost}
        initialContent={postContent}
      />
  );
};

export default RegisterPostModalContainer;
