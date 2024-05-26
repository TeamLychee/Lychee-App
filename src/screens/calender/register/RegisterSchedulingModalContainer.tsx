
import React from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { postData } from '../../../api/APIs';
import RegisterSchedulingModalView from './RegisterSchedulingModalView';

interface RegisterSchedulingModalContainerProps {
  isVisible: boolean;
  onClose: () => void;
  setIsScheduling: () => void;
}

const RegisterSchedulingModalContainer: React.FC<RegisterSchedulingModalContainerProps> = ({ isVisible, onClose, setIsScheduling }) => {

  const {userToken} = useAuth();

  const addScheduling = async (title: string, dates: string[], startTime: string, endTime: string
  ) => {
    // JSON 데이터 생성
      const newData = {
        title, 
        dates,
        startTime,
        endTime,
      };
      console.log('post addScheduling Data will be sended: ', newData);
  
      try {
        // addData 함수를 사용하여 서버에 POST 요청
        const path = '/calendar/create/schedule'; // 요청을 보낼 경로
        const response = await postData<typeof newData, any>(path, newData, userToken); // 여기서 응답 데이터 타입은 실제 응답에 맞게 수정해야 합니다.
        console.log('addScheduling 서버 응답:', response);
        setIsScheduling();
        onClose();
      } catch (error) {
        console.error('addScheduling 서버 요청 실패:', error);
      }
  };
  return (  
    <RegisterSchedulingModalView isVisible={isVisible} onClose={onClose} addScheduling ={addScheduling}/>
  );
};


export default RegisterSchedulingModalContainer;
