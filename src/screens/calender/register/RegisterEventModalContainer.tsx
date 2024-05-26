import React, { useEffect, useState } from 'react';
import RegisterEventModalView from './RegisterEventModalView';
import { deleteData, patchData, postData } from '../../../api/APIs';
import { useAuth } from '../../../auth/AuthContext';
import { EventProps, modeType } from '../types';
import { UserProps } from '../../mypage/types';
import useIsInThisWeek from '../todo/UseIsInThisWeek';

interface RegisterEventModalContainerProps {
  mode: modeType;
  isVisible: boolean;
  editingEvent: EventProps | null;
  onClose: () => void;
  getEvents: () => void;
}

const formatDate = (date: Date) => {

  const dateTimeString = date.toLocaleString();

  // 문자열 분리
  const parts: string[] = dateTimeString.split(/[\s,]+/); // 공백, 쉼표 등으로 분리
  console.log('parts', parts);

  const dateString = parts[0].split('/');
  console.log('dateString', dateString);

  const day: string = dateString[2];
  const month: string = dateString[1];
  const year: string = dateString[0];

  const timeString = parts[1].split(':');
  let hour: string = timeString[0];
  let min: string = timeString[1];
  let sec: string = timeString[2];

  let hourOn24 = parseInt(hour);

  if (parts[2] === 'PM') {
      hourOn24 += 12;
      let hour = hourOn24.toString();
  }

  // YYYY-MM-DD HH:mm:ss 형식으로 조합하여 반환
  const text =  `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour}:${min}:${sec}`;
  console.log(text);
  return text;
}

const RegisterEventModalContainer: React.FC<RegisterEventModalContainerProps> = ({ mode, getEvents, editingEvent, isVisible, onClose }) => {
  console.log('RegisterBudget mode:', mode); 

  const { userToken } = useAuth();

  const [isInThisWeek] = useIsInThisWeek();

  const [id, setId] = useState<string>('');

  useEffect(() => {
    if(editingEvent && editingEvent.id) setId(editingEvent.id.toString());
    console.log('RegisterBudgetModal id:', id);
  }, [editingEvent]);

  const addEvent = async (title: string, start: Date, end: Date, term: number, participants: string[], memo: string) => {
      const newData = {
        title: title, 
        memo: memo,
        dateStart: formatDate(start),
        dateEnd: formatDate(end),
        term: term,
        participants: participants,
      };
      console.log('post Event Data will be sended: ', newData);
  
      try {
        // addData 함수를 사용하여 서버에 POST 요청
        const path = '/calendar/create'; // 요청을 보낼 경로
        const response = await postData<typeof newData, any>(path, newData, userToken); // 여기서 응답 데이터 타입은 실제 응답에 맞게 수정해야 합니다.
        console.log('addEvent 서버 응답:', response);
        onClose(); // 등록 버튼 클릭 후 모달 닫기
        getEvents();
       // if(isInThisWeek(start) | isInThisWeek(end))
      } catch (error) {
        console.error('addEvent 서버 요청 실패:', error);
      }
  };
  
  const editEvent = async (title: string, start: Date, end: Date, term: number, participants: string[], memo: string) => {
      try {
        const newData = {
          title: title, 
          memo: memo,
          dateStart: formatDate(start),
          dateEnd:  formatDate(end),
          term: term,
          participants: participants,
        };
        console.log('editEvent data will be sended: ', newData);
        const path = '/calendar/update/'+id;
        const response = await patchData(path, newData, userToken); // 업데이트할 데이터를 전달합니다.
        console.log('editEvent 서버 응답:', response);
        onClose(); // 등록 버튼 클릭 후 모달 닫기
        getEvents();
      } catch (error) {
        console.error('editEvent 서버 요청 실패:', error);
      }
  };

  const deleteEvent = async () => {
    try {
      const path = '/calendar/delete/'+id;
      await deleteData(path, userToken);
      console.log(id, 'deleteEvent 완료');
      onClose();
      getEvents();
    } catch (error) {
      console.error('deleteEvent 실패:', error);
    }
  };

  const regesterEvent = mode === 'edit' ? editEvent : addEvent;

  return (  
   <RegisterEventModalView 
    mode={mode} 
    isVisible={isVisible} 
    onClose={onClose}
    regesterEvent={regesterEvent}
    deleteEvent ={deleteEvent}
    editingEvent = {editingEvent}
    />
  );
};

export default RegisterEventModalContainer;