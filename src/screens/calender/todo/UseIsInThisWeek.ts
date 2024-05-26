// 새로운 event가 이번주에 있는지 확인하는 util
const today = new Date();

export const todayString = today.toISOString().split('T')[0];

import { useState, useEffect } from 'react';

const useIsInThisWeek = (): [(someDay: Date) => boolean, boolean] => {
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWeekDates = (today: Date): Date[] => {
      const date = new Date(today);
      const dayOfWeek = date.getDay(); // 0 (일요일)부터 6 (토요일)까지의 값을 반환합니다.
      const diffMonday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // 오늘이 일요일인 경우에 대한 처리
    
      const weekDates: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date.setDate(diffMonday + i));
        weekDates.push(currentDate);
      }
    
      return weekDates;
    }

    setWeekDates(getWeekDates(today));
    setLoading(false);
  }, []);

  const isInThisWeek = (someDay: Date): boolean => {
    const isInWeek = weekDates.some(date => {
      return date.toDateString() === someDay.toDateString();
    });
    return isInWeek;
  };

  return [isInThisWeek, loading];
}

export default useIsInThisWeek;
