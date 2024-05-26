// PostView.tsx
import React, {useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../common/Colors';
import MateBox from '../../common/MateBox';
import { EventProps } from './types';
import ThreeDotsIcon from '../../assets/icons/ThreeDotsIcon';
import { UserProps } from '../mypage/types';

const formatTimeRange = (start: string, end: string) => {
  let startYear = '';
  let startDay = '';
  let startTime = '';
  let endYear = '';
  let endDay = '';
  let endTime = '';
  let line = ''

  const deleteZero = (date: string) => {
    if(date[0]=='0') return date.substring(1);
    else return date;
  }

  const parseTo24hour = (hour: string) => {
    console.log('hour', hour)
    let mode = '오전';
    let hourInt = parseInt(hour);
    if(hourInt > 13) hourInt -=  12; mode = '오후';
    const result = hourInt.toString();
    console.log('result', result);
    return mode+' '+deleteZero(result);
  } 
  
  const formetTime = (date : string) => {
    const parts: string[] = date.split('T');
    const dateString: string[] = parts[0].split('-');
    let year = dateString[0]+'년 ';
    let day = deleteZero(dateString[1])+'월 '+deleteZero(dateString[2])+'일 ';
    let hour = parseTo24hour(parts[1].substring(0,2));
    let min = parts[1].substring(3,5);
    let time = hour+':'+min;
    return {year, day, time}
  }

  const startText = formetTime(start);
  startTime = startText.time;

  if(start != end) {
    line = ' ~ '
    const endText = formetTime(end);
    endTime = endText.time;
    if(startText.day!=endText.day) {
      startDay = startText.day;
      endDay = endText.day;
    }
    else if(startText.year!=endText.year) {
      startYear = startText.year;
      endYear = endText.year;
      startDay = startText.day;
      endDay = endText.day;
    }
  }
  
  const result = `${startYear}${startDay}${startTime}${line}${endYear}${endDay}${endTime}`
  return result;
};

interface EventViewProps extends EventProps {
  openModal: () => void;
  handleEditingEvent: (id: string, title: string, start: string, end: string, term: number, participants: UserProps[], memo: string) => void;
}

const EventView: React.FC<EventViewProps> = ({ id, participants, title, memo, term, start, end, openModal, handleEditingEvent}) => {
    
  const timeRange = formatTimeRange(start, end);

  console.log('Event start ',start,' end ', end);

  const [isFocused, setIsFocused] = useState(false);

  const handleEdit = () => {
    handleEditingEvent(id, title, start, end, term, participants, memo);
    openModal();
  }

  return(
  <View style={styles.generalBox}>
    {/* 담당자 Person in charge, PIC & 버튼(threeDots, 수정/삭제) */}
    <View style={styles.PICsAndButtonContainer}>
        {/* 담당자 Person in charge, PIC */}
        <View style={styles.PICsContainer}>
        {participants.map((participant, index) => (
          <MateBox
            key={index.toString()} // key prop을 MateBox에 직접 적용
            userId={participant.userId}
            userName={participant.userName} // participant를 올바르게 참조
            userColor={participant.userColor}
            textSize={12}
            marginRight={3}
          />
        ))}
        <View style={styles.timeContainer}>
          {/* 일정 시작시간~종료시간 */ }   
          <Text style={[styles.text, {fontSize: 16, marginVertical: 3, marginLeft: 3}]}> 
            {timeRange} 
          </Text>
          {/* 루틴 여부 표시. term > 0 일 경우만 노출 */}  
          { term != 0 && (
            <View style={styles.routineContainer}> 
              <Text style={[styles.text]}>루틴</Text>
            </View>
          )}
        </View>
        </View>
          <TouchableOpacity
            onPressIn={() => setIsFocused(true)}
            onPressOut={() => setIsFocused(false)}
            onPress={handleEdit}
            style={[styles.buttonContainer, isFocused && styles.focused]}
          >
            <ThreeDotsIcon color={Colors.button}/>   
          </TouchableOpacity>
    </View>

    {/* 일정 내용 */}    
    <View style={styles.lineAndContentContainer}>
      <View style={styles.line}></View>
        <View style={[styles.contentContainer]}>
          <Text style={styles.title}>{title}</Text>
          { memo && (
            <Text style={[styles.text]}>{memo}</Text>
            )
          }
    </View>
  </View>
  </View>
  );
}

const styles = StyleSheet.create({
  generalBox: {
    marginHorizontal: '5%',
    padding: 10,
  },

  PICsAndButtonContainer : {
    flexDirection: 'row',
  },

  PICsContainer: {
    flex: 8,
    flexDirection:'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: 20,
    height: 20,
    borderRadius: 50,
  },

  timeContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },

  routineContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    marginLeft: 5,
  },

  lineAndContentContainer: {
    flexDirection: 'row',
  },

  line: {
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 10,
  },

  contentContainer: {
   marginLeft: 7,
  },

  title: {
    fontSize: 16, 
    marginBottom: 3,
  },

  text: {
    fontSize: 14,
    color: '#000000',
  },

  focused: {
    backgroundColor: 'rgba(181, 181, 181, 0.4)', //포커스 시 배경색
  },
});

export default EventView;

/*
{showButton && (
  <View style={styles.buttonContainer}>
      <TouchableOpacity
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
      onPress={handleEdit}
      style={[styles.buttonContainer, isFocused && styles.focused]}
      >
          <ThreeDotsIcon />   
      </TouchableOpacity>
  </View>
)} */