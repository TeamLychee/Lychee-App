import { useAuth } from '../../auth/AuthContext';
import { Colors } from '../../common/Colors';
import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Modal, TextInput } from 'react-native';


interface MyGroupNameRegisterModalProps {
  isVisible: boolean;
  onClose: () => void;
  editGroupName: (name: string) => void;
}

const MyGroupNameRegisterModal: React.FC<MyGroupNameRegisterModalProps> = ({isVisible, onClose, editGroupName}) => {
  
  const {groupName} = useAuth();
  const [name, setName] = useState<string>(groupName);

  const handleRegister = () => {
    editGroupName(name);
    onClose;
  }
  
  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={{borderBottomColor: Colors.text, borderBottomWidth: 1, marginBottom: 10,}}>
            <Text style={styles.titleText}>그룹 닉네임 변경</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>이름</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="이름을 입력하세요"
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.text}
            />
          </View>
        
        <View style={[styles.buttonContainer,{justifyContent: 'flex-end'}]}>
          <TouchableOpacity onPress={onClose} style={[styles.buttonShape, {marginRight: 5}]}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister} style={[styles.buttonShape, {backgroundColor: Colors.theme}]}>
            <Text style={[styles.buttonText, {color: '#ffffff'}]}>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
  );
}

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
    borderRadius: 10,
    width: '80%',
    minHeight: 200,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  itemContainer: {
    marginVertical: 5,
  },

  textInputContainer: {
    marginTop: 5,
    marginBottom: 10,
  },

  textInput: {
    borderRadius: 6,
    backgroundColor: Colors.textInputField,
    height: 25,
    paddingHorizontal: 5,
  },

  itemText: {
    fontSize: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  buttonShape: {
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
  },
});

export default MyGroupNameRegisterModal;
