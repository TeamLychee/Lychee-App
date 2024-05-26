import React, { useEffect, useState } from 'react';
import { deleteData, getData, postData } from '../../../api/APIs';
import { useAuth } from '../../../auth/AuthContext';
import SchedulingModalView from './SchedulingModalView';
import { SchedulingProps, TimeSlotProps } from '../types';
import { timeSlotsArrayToRecord, timeSlotsRecordToArray } from './TimeSlotUtils';

interface SchedulingModalContainerProps {
  isVisible: boolean;
  onClose: () => void;
  schedulingData: SchedulingProps,
  setIsScheduling: () => void,
  isScheduling: boolean,
}

interface serverTimeSlotProps {
    time: string;
    date: string;
    selectedBy: string[];
}

const SchedulingModalContainer: React.FC<SchedulingModalContainerProps> = ({ isVisible, onClose, isScheduling, schedulingData, setIsScheduling }) => {
  
  const { userToken } = useAuth();

  const [timeSlots, setTimeSlots] = useState<Record<string, TimeSlotProps>>({});

  const handleCancel = () => {
    onClose();
  };

  const getTimeSlots = async () => {
    try {
      const path = '/calendar/schedule/timeslot/'+schedulingData.id;
      const serverData = await getData<serverTimeSlotProps[]>(path, userToken);

      console.log('serverData', serverData);
      const data: TimeSlotProps[] = [];

      console.log('data', data)
      // 각 요소를 변환하여 새로운 형식의 배열에 추가
      serverData.forEach((item: serverTimeSlotProps) => {
        const transformedItem: TimeSlotProps = {
          time: item.time,
          date: item.date,
          selectedBy: item.selectedBy // userId만 추출하여 저장
        };
        data.push(transformedItem);
      });

      const recordData = timeSlotsArrayToRecord(data);
      console.log('recordData', recordData);
      setTimeSlots(recordData);
      
    } catch (error) {
        if (error instanceof TypeError) {
          // TypeError 타입의 에러 처리
          console.error('getTimeSlots TypeError:', error);
        } else if (error instanceof ReferenceError) {
          // ReferenceError 타입의 에러 처리
          console.error('getTimeSlots ReferenceError:', error);
        } else {
          // 다른 모든 에러 처리
          console.error('getTimeSlots Unknown Error:', error);
        }
    }
  };

  const postTimeSlots = async (newData: TimeSlotProps[]) => {
    console.log('new postTimeSlots will be sended: ', newData);
    try {
      // addData 함수를 사용하여 서버에 POST 요청
      const path = '/calendar/create/schedule/timeslot/'+schedulingData.id; // 요청을 보낼 경로
      const response = await postData<typeof newData, any>(path, newData, userToken); 
      console.log('postTimeSlots 서버 응답:', response);
      getTimeSlots();
    } catch (error) {
      console.error('postTimeSlots 서버 요청 실패:', error);
    }
  };

  const deleteScheduling = async () => {
    try {
      const path = '/calendar/delete/schedule/'+schedulingData.id;
      await deleteData(path, userToken);
      console.log(schedulingData.id, 'delete scheduling 완료');
      onClose();
      setIsScheduling();
    } catch (error) {
      console.error('delete scheduling 실패:', error);
    }
  };

  useEffect(() => {
    getTimeSlots();
    console.log(timeSlots)
  }, []); 

  return (  
    <SchedulingModalView 
      isVisible={isVisible} 
      onClose={handleCancel} 
      deleteScheduling={deleteScheduling} 
      schedulingData={schedulingData} 
      timeSlots={timeSlots}
      postTimeSlots={postTimeSlots}
    />
    
  );
};

export default SchedulingModalContainer;


