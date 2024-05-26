import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../common/CommonStyles';
import { Colors } from '../../../common/Colors';
import { SchedulingProps } from '../types';
import SchedulingModalContainer from './SchedulingModalContainer';
import { formatDate } from './TimeSlotUtils';

interface SchedulingViewProps {
  schedulingData: SchedulingProps,
  setIsScheduling: () => void,
  isScheduling: boolean,
}

const SchedulingView: React.FC<SchedulingViewProps> = ({schedulingData, setIsScheduling, isScheduling }) => {
  const [modalVisible, setModalVisible] = useState(false); // 모달의 표시 상태를 관리하는 state
  const openModal = () => setModalVisible(true); // 모달을 여는 함수
  const closeModal = () => setModalVisible(false); // 모달을 닫는 함수

  const dates = schedulingData.dates;

  return (
      <View style={styles.container}>     
            <View style={styles.textConatiner}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text> {formatDate(dates[0]).substring(3)}</Text>
              {dates.map((item, index) => (
                index !== 0 && (
                  <Text key={index}>, {formatDate(item).substring(3)}</Text>
                )
              ))}
            </View>
              <Text style={styles.text}>{schedulingData.title}</Text>
            </View>

            {/* 모달 버튼*/}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={openModal} >
                  <Text style={styles.buttonText}> 참여 </Text>
                </TouchableOpacity>
            </View>
            <SchedulingModalContainer 
              isVisible={modalVisible} 
              onClose={closeModal} 
              setIsScheduling={setIsScheduling}
              schedulingData={schedulingData}
              isScheduling={isScheduling}
            />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    marginVertical: 12,
    marginHorizontal: '7%',
    ...CommonStyles.shadow,
    alignItems: 'center',
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    flexDirection: 'row'
  },
  textConatiner : {
    flex: 1,
    paddingLeft: 10,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    borderRadius: 7,
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
    width: 74,
    height: 29,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  }
})

export default SchedulingView;
