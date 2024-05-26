import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Alert } from 'react-native';
import { SchedulingProps, TimeSlotProps } from '../types';
import TimeSlotsView from './TimeSlotsView';
import { Colors } from '../../../common/Colors';

interface SchedulingModalViewProps {
  isVisible: boolean;
  schedulingData: SchedulingProps,
  timeSlots: Record<string, TimeSlotProps>;
  onClose: () => void;
  deleteScheduling: () => void;
  postTimeSlots: (newData: TimeSlotProps[]) => void;
}

const SchedulingModalView: React.FC<SchedulingModalViewProps> = ({isVisible, schedulingData, timeSlots,  postTimeSlots, onClose, deleteScheduling, }) => {

  const boxHeight = '17%';

  const handleDeleteScheduling = () => {
    Alert.alert(
      '',
      '일정조율이 종료되면 다시 확인하실 수 없습니다. 계속 하시겠습니까?',
      [ {  text: '취소', 
        },
        {  text: '확인', 
          onPress: deleteScheduling,
        }
      ],
      { cancelable: true }
    );
  }
 
  return (
    <Modal
    visible={isVisible}
    transparent
    animationType="fade"
    >
    <SafeAreaView style={styles.safeaArea}>
      {/* rounded box , 스크린 화살표*/}
      <View style={[styles.roundBox, {height: boxHeight}]}>
            <View style={{flex:1}}>
                <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000'}}>일정조율</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={onClose}
            >
                <Text style={{color: '#000', fontSize: 18, marginRight: 10}}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteScheduling}
            >
                <Text style={{color: '#000', fontSize: 18}}>종료</Text>
            </TouchableOpacity>
            </View>
      </View>
       
    <View style={styles.content}>
          {/* timetable container*/}
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TimeSlotsView 
              timeSlots={timeSlots}
              dates={schedulingData.dates}
              title={schedulingData.title}
              startTime={schedulingData.startTime}
              endTime={schedulingData.endTime}
              postTimeSlots={postTimeSlots}
            />
          </View>
        </View>      
    </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeaArea: {
    flex: 1, 
    backgroundColor: Colors.background,
    alignItems: 'center',
  },

  content: {
    marginTop: 80,
    flex: 1,
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10
  },

  buttonAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {

  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    maxWidth: "100%",
  },

  text: {
    fontSize: 12,
    color: '#b5b5b5',
    alignItems: 'flex-start',
  },

  timeSlotContainer: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    width: '100%',
    flex: 1,
  },

  timeSlot: {
    width: '30%',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },

  timeText: {
    textAlign: 'center',
  },
  participicantsContainer: {
    width: '93%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 7,
  },

  userButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },

  activeUserButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey'
  },

  userButtonText: {
    textAlign: 'center',
    color: '#000000',
  },

  roundBox: {
    zIndex: 1, // 낮은 zIndex로 뒤에 위치
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: 'absolute',
    width: '100%',
    height: 118,
    paddingTop: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
});

export default SchedulingModalView;