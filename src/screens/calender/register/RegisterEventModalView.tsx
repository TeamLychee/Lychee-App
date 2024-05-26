import { TextInput } from 'react-native';
import { Colors } from '../../../common/Colors';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { EventProps } from '../types';
import { UserProps } from '../../mypage/types';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../../../auth/AuthContext';
import MateBox from '../../../common/MateBox';

interface RegisterEventModalViewProps {
  isVisible: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  regesterEvent: (title: string, start: Date, end: Date, term: number, participants: string[], memo: string) => void;
  deleteEvent: () => void;
  editingEvent: EventProps | null;
}

interface UserItem {
  label: string;
  value: string;
}

const createUserItems = (users: UserProps[]): UserItem[] => {
  const userItems: UserItem[] = users.map(user => ({
    label: user.userName,
    value: user.userId
  }));
  return userItems;
};

const RegisterEventModalView: React.FC<RegisterEventModalViewProps> = ({ isVisible, onClose, mode, regesterEvent, deleteEvent, editingEvent }) => {

  const { loggedUser, getLoggedUser, mates, getMates } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [term, setTerm] = useState<number>(0);

  const [memo, setMemo] = useState<string>('');
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [selectedTerm, setSelectedTerm] = useState<number>(0);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([loggedUser.userId]);
  
  console.log('start', start, 'end', end, '.toLocaleTimeString()');
  console.log('.toLocaleTimeString()', start.toLocaleTimeString(), end.toLocaleTimeString());

  const termItems=[
    { label: '매일', value: 1 },
    { label: '매주', value: 2 },
    { label: '매달', value: 3 },
    { label: '매년', value: 4 },
  ]  

  const participantItems = createUserItems(mates);

  //배열 합치기 
  const allparticipant: UserProps[] = [loggedUser, ... mates]

  console.log('participantItems', participantItems);
  console.log('selectedParticipantValues', selectedParticipants)

  const findUser  = (value: string) => {
    const filteredData = allparticipant.filter((item: UserProps) =>
      item.userId.includes(value)
    );
    return filteredData;
  }

  // 선택된 값이 변경될 때마다 호출되는 함수
  const handleParticipantsChange = (value: string) => {
    // 선택된 값이 배열에 이미 포함되어 있는지 확인
    const index = selectedParticipants.indexOf(value);
    if (index === -1) {
      // 선택된 값이 배열에 없으면 추가
      setSelectedParticipants(prevValues => [...prevValues, value]);
    } else {
      // 선택된 값이 배열에 있으면 제거
      setSelectedParticipants(prevValues => prevValues.filter(val => val !== value));
    }
  };

  const setInitialData = () => {
    if(mode==='edit' && editingEvent) {
      const initialParticipants: string[] = editingEvent.participants.map(item => item.userId);

      setTitle(editingEvent.title);
      setStart(new Date(editingEvent.start));
      setEnd(new Date(editingEvent.end));
      setTerm(editingEvent.term);
      setSelectedParticipants(initialParticipants);
      setMemo(editingEvent.memo);
      console.log('editingEvent.start', editingEvent.start);
    }
    console.log('editingEvent InitialData: ',editingEvent);
  }

  const onChangeStart = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || start;
    setStart(currentDate);
  };

  const onChangeEnd = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || end;
    setEnd(currentDate);
  };

  const handleCancel = () => {
    console.log('--------------handleCancel');
    onClose();
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
    setMemo('');
    setSelectedTerm(0);
    setSelectedParticipants([]);
  };

  const handleRegister = () => {
    console.log('----------------handleRegister ');
    console.log('handle register', title, start, end, selectedTerm, selectedParticipants, memo);
    regesterEvent(title, start, end, selectedTerm, selectedParticipants, memo);
    handleCancel();
  }

  const handleDelete = () => {
    console.log('--------------handleDelete')
    deleteEvent();
    console.log('--------------deleteEvent')
    handleCancel();
    console.log('--------------handleCancel')
  }

  useEffect(() => {
    setInitialData();
  }, [editingEvent]);

  useEffect(() => {
    if (end < start) {
      setEnd(start);
    }
  }, [start, end]);

  useEffect(() => {
    getLoggedUser();
    getMates();
  }, []);

  return (  
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

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

        {/* line shape*/}
        <View style = {{borderBottomWidth: 1, borderColor: Colors.text, marginVertical: 10}} />
        
        {/* start */}
        <View style={styles.titleAndInputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>시작</Text>
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <DateTimePicker
              testID="dateTimePicker"
              value={start}
              mode="datetime"
              display="default"
              onChange={onChangeStart}
              locale="ko_KR"
            />
          </View>
        </View>

        {/* end */}
        <View style={styles.titleAndInputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>종료</Text>
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <DateTimePicker
              testID="dateTimePicker"
              value={end}
              mode="datetime"
              display="default"
              onChange={onChangeEnd}
              locale="ko_KR"
            />
          </View>
        </View>

        {/* 반복 주기*/}
        <View style={styles.titleAndInputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>반복주기</Text>
          </View>
          <View style={styles.inputContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedTerm(value)}
              items={termItems}
              placeholder={
                {label: '없음', value: 0}
              }
            />
          </View>
        </View>

        {/* participants */}
        <View style={styles.titleAndInputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>담당자</Text>
          </View>
          <View style={styles.inputContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleParticipantsChange(value)}
              items={participantItems}
              placeholder={{label: loggedUser.userName, value: loggedUser.userId}}     
            />
          </View>
        </View>
        { mates && selectedParticipants && 
          <View style={styles.selectedPartivipants}>
          {selectedParticipants.map((value) => (
            <MateBox 
              key={value}
              textSize={12} 
              userId={value} 
              userName={findUser(value)[0].userName}
              userColor={findUser(value)[0].userColor}
              marginRight={3}
            />
          ))}
          </View>
        }

        {/* memo */}
        <View style={[styles.titleAndInputContainer, {flexDirection: 'column'}]}>
          <Text style={[styles.title, {marginBottom: 10}]}>메모</Text>
          <TextInput
            style={styles.textInput}
            placeholder="메모를 입력하세요"
            value={memo}
            onChangeText={(text) => {
              setMemo(text);
            }}
            placeholderTextColor={Colors.text}
          />
        </View>

        {/* edit , delete, register button */}
        <View style={styles.buttonsContainer}>
            <View style={[styles.buttonContainer, {justifyContent: 'flex-start'}]}>
              {mode == 'edit' && (
                <TouchableOpacity onPress={handleDelete} style={[styles.button, {backgroundColor: 'red'}]}>
                  <Text style={[styles.buttonText, {color: '#ffffff'}]}>삭제</Text>
                </TouchableOpacity>)
              }
            </View>
            <View style={[styles.buttonContainer,{justifyContent: 'flex-end'}]}>
              <TouchableOpacity onPress={handleCancel} style={[styles.button, {marginRight: 5}]}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegister} style={[styles.button, {backgroundColor: Colors.theme}]}>
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
  },
  selectedPartivipants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default RegisterEventModalView;
