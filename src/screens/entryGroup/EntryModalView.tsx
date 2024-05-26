import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../common/Colors';

interface EntryModalViewProps {
  mode: 'new' | 'existing';
  isVisible: boolean;
  handleCancel: () => void;
  entryGroup: (content: string) => void;
}

const EntryModalView: React.FC<EntryModalViewProps> = ({ mode, isVisible, handleCancel, entryGroup}) => {

  const [content, setContent] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    // 모든 입력 필드가 비어있지 않은지 확인
    const foundEmpty = () => {
      return (content !== '') ? false : true;  
    };
    // foundEmpty 함수의 결과에 따라 isEmpty 상태 업데이트
    setIsEmpty(foundEmpty());
  }, [content]); 

  const handleEntryGroup = () => {
    if(!isEmpty) {
      entryGroup(content);
    }
    handleCancel();
    setContent('');
    setIsEmpty(true);
  }

  const title = mode === 'new' ? '메이트 그룹 만들기' : '초대코드로 참여하기';
  const placeholderMsg = mode === 'new' ? '새로운 그룹 이름을 입력하세요' : '초대코드를 입력하세요';

  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.modalTitle}>
            {title}
          </Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={placeholderMsg}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            placeholderTextColor={Colors.text}
          />
          <View style={styles.buttonsContainer}>
            <View style={[styles.buttonContainer,{justifyContent: 'flex-end'}]}>
              <TouchableOpacity onPress={handleEntryGroup} style={[styles.button, {marginRight: 5}]}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEntryGroup} 
                style={[styles.button, isEmpty ? {backgroundColor: Colors.text} : {backgroundColor: Colors.theme}]}>
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
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 10,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 50,
    backgroundColor: Colors.textInputField,
  },
  buttonsContainer: {
    flexDirection: 'row',
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
});

export default EntryModalView;
