import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { TimeSlotProps, UserButtonProps } from '../types';
import { useAuth } from '../../../auth/AuthContext';
import { convertUserPropsToUserButtonProps } from './TimeSlotUtils';
import { UserProps } from '../../../screens/mypage/types';

interface TimeSlotsViewProps {
    title: string;
    dates: string[];
    startTime: string,
    endTime: string,
    timeSlots: Record<string, TimeSlotProps>;
    postTimeSlots: (newData: TimeSlotProps[]) => void;
}

const TimeSlotsView: React.FC<TimeSlotsViewProps> = ({startTime, endTime, dates, timeSlots, title, postTimeSlots}) => {
    
    const {mates, loggedUser} = useAuth();

    const [localTimeSlots, setLocalTimeSlots] = useState<Record<string, TimeSlotProps>>({});
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [activeUser, setActiveUser] = useState<string | null>(null);
    
    //모든 참여자  
    const allparticipant: UserProps[] = [loggedUser, ... mates]

    const userButtonItems: UserButtonProps = convertUserPropsToUserButtonProps(allparticipant);
    
    console.log('userButtonItems', userButtonItems);

    let startHour = parseInt(startTime.substring(0,2));
    let endHour =  parseInt(endTime.substring(0,2));
   

    {/* 타임슬롯 선택하는 것 */}
    const toggleTimeSlot = (date: string, time: string) => {
      if (!activeUser || !selectedDate || activeUser !== loggedUser.userId ) return; 
  
      setLocalTimeSlots((prevSlots) => {
        const newSlots = { ...prevSlots };
        const slotKey = `${date} ${time}`;
        const slot = newSlots[slotKey];
      
        if (!slot) {
          newSlots[slotKey] = { date, time, selectedBy: [activeUser] };
          console.log(`슬롯 선택됨: date: ${date}/ time: ${time}/ 현재 선택한 사용자: ${newSlots[slotKey].selectedBy} / 선택한 사용자:${activeUser}`);
        } else {
          if (slot.selectedBy.includes(activeUser)) {
            slot.selectedBy = slot.selectedBy.filter(u => u !== activeUser);
            console.log(`슬롯 선택 해제됨: date: ${date}/ time: ${time}/ 현재 선택한 사용자: ${slot.selectedBy} / 선택 해제한 사용자: ${activeUser}`);
          } else {
            slot.selectedBy.push(activeUser);
            console.log(`슬롯 선택됨: 날짜: ${date}/ 시간: ${time}/ 현재 선택한 사용자: ${slot.selectedBy} / 선택한 사용자:${activeUser}`);
          }
        }
        return newSlots;
      });
  };
  
  const renderDateButtons = () => {
    return (
      <View style={styles.dateButtonContainer}> 
        {/* 변경된 부분: 날짜 버튼을 렌더링하는 함수 */}
        {dates.map(date => (
          <TouchableOpacity
            key={date}
            style={[
              styles.dateButton,
              selectedDate === date && styles.selectedDateButton // 변경된 부분: 선택된 날짜 스타일 적용
            ]}
            onPress={() => setSelectedDate(date)} // 변경된 부분: 날짜 선택 이벤트 핸들러 추가
          >
            <Text style={styles.dateButtonText}>{date.substring(0,4)} {date.substring(5,7)}/{date.substring(8)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const renderUserButtons = () => {
    return (
      <View style={styles.userButtonContainer}>
        <TouchableOpacity
          style={[
            styles.userButton, 
            { backgroundColor: '#ccc' },
            activeUser === null && styles.activeUserButton
          ]}
          onPress={() => {setActiveUser(null)}}
        >
          <Text style={[styles.userButtonText, !activeUser && styles.activeUserText]}>
            모두 
          </Text>
        </TouchableOpacity>
        {/*
        <TouchableOpacity
            style={[
              styles.userButton, 
              { backgroundColor: loggedUser.userColor },
              activeUser === loggedUser.userId && styles.activeUserButton,
            ]}
            onPress={() => setActiveUser(loggedUser.userId)}
          >
          <Text style={[styles.userButtonText, activeUser === loggedUser.userId && styles.activeUserText]}>
            {loggedUser.userName}
          </Text>
          </TouchableOpacity>
          */}
        {Object.keys(userButtonItems).map(user => (
          <TouchableOpacity
            key={user}
            style={[
              styles.userButton, 
              { backgroundColor: userButtonItems[user].color },
              activeUser === user && styles.activeUserButton,
            ]}
            onPress={() => setActiveUser(user)}
          >
          <Text style={[styles.userButtonText, activeUser === user && styles.activeUserText]}>
            {userButtonItems[user].name}
          </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  
  const renderTimeSlots = () => {
    const slots: JSX.Element[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour}:${minute === 0 ? '00' : minute}`;
        const slotKey = `${selectedDate} ${time}`;
        const selectedUsers = localTimeSlots[slotKey]?.selectedBy || [];
        let backgroundColor = 'white';
        let textColor = 'black';
        if (activeUser === null) {
            // 모두 보기 모드
            if (selectedUsers.length === Object.keys(userButtonItems).length) {
              // 모든 사용자가 선택한 경우
              backgroundColor = 'grey';
              textColor = 'white';
            } else if (selectedUsers.length > 1) {
              // 두 명 이상이 선택한 경우
              backgroundColor = 'lightgrey';
              textColor = 'white';
            } else if (selectedUsers.length === 1) {
              // 한 명만 선택한 경우
              console.log(selectedUsers)
              backgroundColor = userButtonItems[selectedUsers[0]]?.color;
              textColor = 'white';
            }
        } else {
            // 개별 사용자 모드
            if (selectedUsers.includes(activeUser)) {
              backgroundColor = userButtonItems[activeUser].color;
              textColor = 'white';
            }
        }

        slots.push(
            <TouchableOpacity
            key={time}
            style={[styles.timeSlot, { backgroundColor }]}
            onPress={() => toggleTimeSlot(selectedDate, time)} // date 값을 전달
          >
            <Text style={[styles.timeText, {color: textColor}]}>{time}</Text>
          </TouchableOpacity>          
        );
      }
    }
    
    return slots;
  }

  const handleUpdateSlots = () => {
    console.log('before localTimeSlots', localTimeSlots);
    const array: TimeSlotProps[] = [];
    Object.keys(localTimeSlots).forEach(key => {
      array.push(localTimeSlots[key]);
    });
    postTimeSlots(array);
    setLocalTimeSlots(timeSlots);
    console.log('after localTimeSlots', localTimeSlots);
  }

  function handlePostTimeSlots() {
    Alert.alert(
      '',
      '저장하시겠습니까? ',
      [{
        text: '취소',
      },
      {
        text: '확인',
        onPress: handleUpdateSlots
      }
      ],
      { cancelable: true }
    );
  }

  useEffect(() => {
    setLocalTimeSlots(timeSlots);
    setSelectedDate(dates[0]);
  }, [timeSlots]); 

  return (
    <View style={styles.container}>
      {/* title container*/}
      <View style={styles.titleContainer}>
            <View style={{flex: 9, justifyContent: 'center'}}>
                <Text style={[styles.title]}> 
                  {title}
                </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={handleUpdateSlots}
              >
                  <Text style={[styles.text, {fontSize: 18}]}>저장</Text>
              </TouchableOpacity>
            </View>
      </View>
    
        <ScrollView horizontal={true}>
          <View>{renderDateButtons()}</View>
        </ScrollView>
        <ScrollView>
          <View style={styles.timeSlotContainer}>
            {renderTimeSlots()}
          </View>
        </ScrollView>

        <ScrollView horizontal={true}>
          <View>
          {renderUserButtons()}
          </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row', 
    padding: 10,
  },
  text: {

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    maxWidth: "100%",
  },

  timeSlotContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeSlot: {
      width: 66,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginVertical: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
  },

  timeText: {
    textAlign: 'center',
  },
  
  userButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  
  userButton: {
    width: 66,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginRight: 10,
  },
  activeUserButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  activeUserText: {
    color: '#000'
  },
  userButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  dateButtonContainer:{
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  dateButton: {
    width: 66,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selectedDateButton: {
    backgroundColor: '#ccc', // 변경된 부분: 선택된 날짜의 배경색
  },
  dateButtonText: {
    textAlign: 'center',
    color: '#000',
  }
})

export default TimeSlotsView;