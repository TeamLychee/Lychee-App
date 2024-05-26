// TodoView.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../../common/Colors';
//import Checkbox from 'expo-checkbox';
import TodoParticipantsView from './TodoParticipantsView';
import { UserProps } from '../../mypage/types';

export interface TodoProps {
    id: number;
    content: string;
    participants: UserProps[];
    weekDays: string;
}

const renderWeekDays = (days: string) => {
    let newDays = days;
    if(newDays === '월화수목금토일') newDays = '매일';
    else if(newDays === '토일') newDays = '주말';
    else if(newDays === '월화수목금') newDays = '평일';
    return newDays;
}

const TodoView: React.FC<TodoProps> = ({content, participants, weekDays}) => {
    
    const [isChecked, setChecked] = useState(false);

    return(        
    <View>
    <View style={styles.container}>
        {/* line & 요일: 가로정렬 */}
        <View style={[{flexDirection: 'row', marginBottom: 1, justifyContent:'flex-end'}]}>
            {/* line */}
            <View style={{borderTopColor:'#f5f5f5', borderTopWidth: 2, marginTop: 12, flex: 1}} />
            {/* weekDays 요일 */}
            <View style={styles.weekDaysBox}>
                <Text style={{fontSize:12}}>{renderWeekDays(weekDays)}</Text>
            </View>
        </View>

        {/* (내용 & 참가자) & (체크박스): 가로정렬 */}
        <View style={[{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5}]}>
            {/* 내용 & 참가자: 세로정렬 */}
            <View style={{flex: 6}}>
                {/* 내용 */}
                <View style={[styles.contentContainer, {margin: 4, flexWrap: 'wrap'}]}>
                    <Text style={styles.text}>{content}</Text>
                </View>
            </View>
        
            {/* participants */}
            <View style={{flex: 3, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
                <View style={[styles.participantsContainer, {alignItems: 'flex-start'}]}>
                    <TodoParticipantsView participants={participants}/>
                </View>
            </View>
           
            {/* 체크박스 */}
            <View style={{justifyContent: 'center', alignItems:'center', paddingHorizontal: 3}}>
                
            </View>
        </View>
    </View>
    </View>
)};
  
const styles = StyleSheet.create({
    container : {
        marginHorizontal: 5,
    },

    participantsContainer:{
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    weekDaysBox : {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        padding: 6,
    },

    contentContainer:{
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
  
    text: {
      fontSize: 16,
      color: '#000000',
    },
  
    mateStyle:{
      borderRadius: 8,
    },
  
    mateText: {
      fontSize: 12,
      color: '#ffffff',
      fontWeight: 'bold',
      margin: 6,
    },

    checkbox: {
       width: 14,
       height: 14,
       borderWidth: 1
    },
})

export default TodoView;