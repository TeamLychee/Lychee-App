import { UserProps } from "../../mypage/types";
import { TimeSlotProps, UserButtonProps } from "../types";

const incrementTimeBy30Minutes = (time: string): string => {
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    let minute = parseInt(minuteStr, 10);
  
    // 분에 30을 더하고 60을 넘으면 시간을 증가시키고 분을 조정
    minute += 30;
    if (minute >= 60) {
      hour++;
      minute -= 60;
    }
  
    // 시간과 분을 문자열로 변환하고 반환
    const paddedHour = hour.toString().padStart(2, '0');
    const paddedMinute = minute.toString().padStart(2, '0');
    return `${paddedHour}:${paddedMinute}`;
  };

function convertUserPropsToUserButtonProps(users: UserProps[]): UserButtonProps {
    const userButtonProps: UserButtonProps = {};
    for (const user of users) {
        userButtonProps[user.userId] = {
            name: user.userName,
            color: user.userColor
        };
    }
    return userButtonProps;
}

// TimeSlotProps[]를 Record<string, TimeSlotProps>로 변환하는 함수
const timeSlotsArrayToRecord = (timeSlots: TimeSlotProps[]): Record<string, TimeSlotProps> => {
    const record: Record<string, TimeSlotProps> = {};
    timeSlots.forEach(slot => {
      const key = `${slot.date} ${slot.time}`;
      record[key] = slot;
    });
    return record;
};
  // Record<string, TimeSlotProps>를 TimeSlotProps[]로 변환하는 함수
const timeSlotsRecordToArray = (record: Record<string, TimeSlotProps>): TimeSlotProps[] => {
    const array: TimeSlotProps[] = [];
    console.log('record', record);
    Object.keys(record).forEach(key => {
      array.push(record[key]);
    });
    console.log('array', array);
    return array;
};
  


const formatDate = (inputDate: string) => {
    const dateParts = inputDate.split('-');
    const year = dateParts[0].substring(2,4);
    const month = dateParts[1];
    const day = dateParts[2];
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  };

// 사용자 수에 따른 색상을 미리 생성하여 Map으로 저장하는 함수
const createColorMap = (maxUsers: number, initialColor: string): Map<number, string> => {
    const colorMap = new Map<number, string>();
    const colorStep = 20; // 각 사용자 수마다 색상이 얼마나 진해질지에 대한 값

    // 초기 색상을 기준으로 색상을 계산하고 Map에 저장
    for (let i = 0; i <= maxUsers; i++) {
        const newColor = darkenColor(initialColor, i * colorStep); // 진해진 색상 계산
        colorMap.set(i, newColor); // Map에 색상 추가
    }

    return colorMap;
};

// 색상을 어둡게 만드는 함수
const darkenColor = (color: string, amount: number): string => {
    // RGB 값을 분리
    const [r, g, b] = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
    // 색상을 어둡게 만들기 위해 각 채널 값을 조절
    const newR = Math.max(0, r - amount);
    const newG = Math.max(0, g - amount);
    const newB = Math.max(0, b - amount);
    // 새로운 RGB 값을 합쳐서 새로운 색상을 반환
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

// 예시: 초기 색상과 최대 사용자 수를 기반으로 색상 맵 생성
const maxUsers = 10; // 최대 사용자 수
const initialColor = '#407CBF'; // 초기 색상
const colorMap = createColorMap(maxUsers, initialColor);

// 예시: 사용자 수에 따른 색상 출력
for (let i = 0; i <= maxUsers; i++) {
   //console.log(`Color for ${i} users:`, colorMap.get(i)); // 각 사용자 수에 따른 색상 출력
}

//예를 들어, colorMap에서 key가 3에 해당하는 value를 가져오려면 다음과 같이 할 수 있습니다:
const colorForThreeUsers = colorMap.get(3);

export {createColorMap, formatDate, 
    timeSlotsArrayToRecord, timeSlotsRecordToArray,
    convertUserPropsToUserButtonProps,
    incrementTimeBy30Minutes
}

/*배열 합치는거
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combinedArray = array1.concat(array2); */

/*
// newSelectUser을 timeSlotSelectedBy에서 추가하거나 제거하는 함수
const updateSelectedBy = (timeSlotSelectedBy: UserProps[], newSelectUser: UserProps): UserProps[] => {
    const index = timeSlotSelectedBy.findIndex(user => user.userId === newSelectUser.userId);

    let selectedBy: UserProps[] = [];
    if (index === -1) {
        // newSelectUser이 timeSlotSelectedBy에 없는 경우, 추가합니다.
        selectedBy = [...timeSlotSelectedBy, newSelectUser];
    } else {
        // newSelectUser이 timeSlotSelectedBy에 있는 경우, 제거합니다.
        selectedBy = timeSlotSelectedBy.filter(user => user.userId !== newSelectUser.userId);
    }

    return selectedBy;
};


// 30분 간격으로 TimeTable을 생성하는 함수
const createTimeTable = (startTime: string, endTime: string): TimeTableProps => {
    const timeTable: TimeTableProps = {};

    let currentTime = startTime;
    while (currentTime < endTime) {
        // 각 시간별로 TimeSlotProps 생성하여 TimeTableProps에 추가
        timeTable[currentTime] = {
            date: '', // 여기에는 날짜가 들어가야 합니다. 날짜는 호출하는 코드에서 제공해야 할 것입니다.
            time: '',
            selectedBy: [], // 초기값으로 빈 배열 설정
        };

        const [hours, minutes] = currentTime.split(':').map(Number);
        const nextMinutes = minutes + 30;
        const nextHours = hours + Math.floor(nextMinutes / 60);
        currentTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes % 60).padStart(2, '0')}`;
    }

    return timeTable;
};

const createDateTables = (dates: string[], startTime: string, endTime: string): DateTableProps => {
    const dateTables: DateTableProps = {};

    dates.forEach(date => {
        const timeTable = createTimeTable(startTime, endTime);
        dateTables[date] = timeTable;
    });

    return dateTables;
};

const createServerTimeSlots = (dateTable: DateTableProps): ServerTimeSlotsProps[] => {
   // 새로운 형식으로 변환된 데이터를 저장할 배열 선언
    const transformedData: { date: string, time: string, selectedBy: string[] }[] = [];

    // dateTable을 순회하면서 변환 작업 수행
    Object.entries(dateTable).forEach(([date, timeTable]) => {
        Object.entries(timeTable).forEach(([time, timeSlot]) => {
            // timeSlot의 selectedBy에서 userId만 추출하여 배열로 변환
            const userIds = timeSlot.selectedBy.map(user => user.userId);
            if(userIds.length > 0 ) {
                // 변환된 데이터를 배열에 추가
                transformedData.push({
                    date: date.toString(),
                    time: time.toString(),
                    selectedBy: userIds,
                });
            }
        });
    });
    // 변환된 데이터 사용
    return(transformedData);
}

const incrementTimeBy30Minutes = (time: string): string => {
    const [hour, minute] = time.split(':').map(Number);
    let newHour = hour;
    let newMinute = minute + 30;
  
    if (newMinute >= 60) {
      newHour += 1;
      newMinute -= 60;
    }
    if (newHour >= 24) {
      newHour = 0;
    }
    const newTime = `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
    return newTime;
  };

  const getTimeRange = (startTime: string, endTime: string): string[] => {
    const timeRange: string[] = [startTime];
    let currentTime = startTime;
  
    while (currentTime < endTime) {
      const [hours, minutes] = currentTime.split(':').map(Number);
      const nextMinutes = minutes + 30;
      const nextHours = hours + Math.floor(nextMinutes / 60);
      currentTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes % 60).padStart(2, '0')}`;
      timeRange.push(currentTime);
    }
  
    return timeRange;
  };
*/
  