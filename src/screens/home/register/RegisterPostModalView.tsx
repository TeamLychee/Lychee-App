import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../../common/Colors';

interface RegisterPostModalViewProps {
  mode: 'create' | 'edit';
  initialContent: string;
  isVisible: boolean;
  handleCancel: () => void;
  setContent: (content: string) => void;
  regesterPost: () => void;
  deletePost: () => void;
}


const RegisterPostModalView: React.FC<RegisterPostModalViewProps> = ({ mode, isVisible, initialContent, handleCancel, setContent, regesterPost, deletePost}) => {
  // useRef에 타입을 지정하여 TextInput의 ref를 생성
  const textInputRef = useRef<TextInput | null>(null);

  // content를 상태로 관리하고, initialContent를 초기 값으로 설정
  const [content, setContentState] = useState(initialContent || '');

  useEffect(() => {
    // 모달이 보이는 상태로 변경될 때마다 initialContent로 content 상태를 재설정
    setContentState(initialContent);
    // 모달이 보이게 될 때 TextInput에 포커스
    if (isVisible) {
      textInputRef.current?.focus();
    }
  }, [initialContent, isVisible]);

  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            multiline={true} // 줄바꿈 허용
            placeholder="게시글 내용을 입력하세요"
            value={content}
            onChangeText={(text) => {
              setContentState(text);  // 상태 업데이트 함수를 사용
              setContent(text);  // 상위 컴포넌트의 상태도 업데이트
            }}
            placeholderTextColor={Colors.text}
          />
          <View style={styles.buttonsContainer}>
            <View style={[styles.buttonContainer, {justifyContent: 'flex-start'}]}>
              {mode == 'edit' && (
                <TouchableOpacity onPress={deletePost} style={[styles.button, {backgroundColor: 'red'}]}>
                  <Text style={[styles.buttonText, {color: '#ffffff'}]}>삭제</Text>
                </TouchableOpacity>)
              }
            </View>
            <View style={[styles.buttonContainer,{justifyContent: 'flex-end'}]}>
              <TouchableOpacity onPress={handleCancel} style={[styles.button, {marginRight: 5}]}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={regesterPost} style={[styles.button, {backgroundColor: Colors.theme}]}>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 200,
    backgroundColor: Colors.textInputField,
    flexWrap: 'wrap',
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

export default RegisterPostModalView;
