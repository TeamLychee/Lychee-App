import { Alert, TextInput } from 'react-native';
import { Colors } from '../../../common/Colors';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import { daysInWeek } from 'date-fns/constants';

LocaleConfig.locales['en'] = {
  today: 'Today',
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  dayNamesShort: [
    'S', 'M', 'T', 'W', 'T', 'F', 'S'
  ],
};
LocaleConfig.defaultLocale = 'en';

interface RegisterSchedulingModalViewProps {
  isVisible: boolean;
  onClose: () => void;
  addScheduling: (title: string, dates: string[], startTime: string, endTime: string)=> void;
}

interface showedDateProps {
  [date: string]: {
    selected: boolean;
  };
}

const generateOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const label = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute}`;
      const value = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute}`;
      options.push({ label, value });
    }
  }
  return options;
};

const isEndTimeValid = (start: string, end: string) => {
  // start 시간을 시와 분으로 분리
  const [startHour, startMinute] = start.split(':').map(Number);
  // end 시간을 시와 분으로 분리
  const [endHour, endMinute] = end.split(':').map(Number);

  // end 시간이 start 시간보다 작거나 같으면 false 반환
  if (endHour <= startHour || (endHour === startHour && endMinute <= startMinute)) {
    return false;
  }

  // end 시간이 start 시간보다 크거나 같으면 true 반환
  return true;
};


const RegisterSchedulingModalView: React.FC<RegisterSchedulingModalViewProps> = ({ isVisible, onClose, addScheduling }) => {
  const [showedDates, setShowedDates] = useState<showedDateProps>({});
  const [title, setTitle] = useState<string>('');
  const [isReadyToSend, setIsReadyToSend] = useState<boolean>(false);
  const [selectedStartValue, setSelectedStartValue] = useState('00'); 
  const [selectedEndValue, setSelectedEndValue] = useState('00'); 

  const timeItems = generateOptions();

  const handleCancel = () => {
    onClose();
    setTitle('');
    setShowedDates({});
    setSelectedStartValue('00:00');
    setSelectedEndValue('00:00');
  };
  
  const handleRegister = () => {
    const dateStrings: string[] = Object.keys(showedDates);

    console.log( 'selectedStartValue, selectedEndValue, ', selectedStartValue, selectedEndValue);

    addScheduling(title, dateStrings, selectedStartValue, selectedEndValue);
    handleCancel();
  }

  const handleDayPress = (date: DateData) => {
    // 선택된 날짜를 토글
    const updatedShowedDates = { ...showedDates };
  
    // date가 이미 선택되어 있는지 확인
    const isSelected = showedDates[date.dateString]?.selected ?? false;
    if (isSelected) {
      delete updatedShowedDates[date.dateString];
    } else {
      updatedShowedDates[date.dateString] = { selected: !isSelected };
    }
    setShowedDates(updatedShowedDates);
    console.log('ShowedDates',updatedShowedDates);
  };

  useEffect(() => {
    // 모든 필수 상태 값이 채워져 있는지 확인.
    if (title && selectedStartValue && selectedEndValue && Object.keys(showedDates).length > 0) {
        setIsReadyToSend(true);
    } else {
      setIsReadyToSend(false);
    }
  }, [title, selectedEndValue, selectedStartValue, showedDates]);

  return (  
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style={[styles.calendarShape]}>
          <Calendar
            dayFormet={{ daysInWeek }}
            hideExtraDays={true}
            onDayPress={handleDayPress}
            markedDates={showedDates}
            enableSwipeMonths={true}
            onMonthChange={month => {
            }}
            // 테마 변경
            theme={{
              arrowColor: '#000000', // 월 이동 화살표 색깔
              selectedDayBackgroundColor: Colors.theme,
              todayTextColor: Colors.theme,
              dayTextColor: '#000000',
              monthTextColor: '#000000',
              todayButtonFontWeight: 'bold',
              dotColor: Colors.text,
              selectedDotColor: '#ffffff',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
        </View>
        {/* title */}
        <View style={styles.titleAndInputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>제목</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, {width: '95%'}]}
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
              placeholderTextColor={Colors.text}
          />
          </View>
        </View>
        {/* start */}
        <View style={styles.titleAndInputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>시작 시각</Text>
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedStartValue(value)}
            items={timeItems}
            placeholder={{label: '시작 시각을 선택하세요', value: null}}
          />
          </View>
        </View>

        {/* end */}
        <View style={styles.titleAndInputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>종료 시각</Text>
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedEndValue(value)}
            items={timeItems}
            placeholder={{label: '종료 시각을 선택하세요', value: null}}
          />
          </View>
        </View>

        {/* edit , delete, register button */}
        <View style={styles.buttonsContainer}>
            <View style={[styles.buttonContainer,{justifyContent: 'flex-end'}]}>
              <TouchableOpacity onPress={handleCancel} style={[styles.button, {marginRight: 5}]}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={isReadyToSend ? handleRegister : undefined } 
                style={[styles.button, isReadyToSend ? {backgroundColor: Colors.theme} : {backgroundColor: Colors.text}]}
              >
                <Text style={[styles.buttonText, {color: '#ffffff'}]}>등록</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },

  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 10,
    borderRadius: 10,
    width: '80%',
  },

  calendarShape: {
    backgroundColor: '#ffffff',
  },

  titleAndInputContainer:{
    flexDirection: 'row',
    marginVertical: 10,
  },

  titleContainer: {
    marginRight: 10,
    justifyContent: 'center',
  },

  inputContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  title: {
    fontSize: 18,
  },
  textInput: {
    borderRadius: 9,
    padding: 5,
    backgroundColor: Colors.textInputField,
    minHeight: 35,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
  },
  dropDownPicker: {
    borderRadius: 9,
    borderColor: Colors.text,
  }
});

export default RegisterSchedulingModalView;
