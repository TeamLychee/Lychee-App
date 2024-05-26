import { Colors } from '../../common/Colors';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal , TouchableOpacity} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../auth/AuthContext';

interface LogoutAndWithdrawalModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LogoutAndWithdrawalModal: React.FC<LogoutAndWithdrawalModalProps> = ({isVisible, onClose}) => {
  const { signOut } = useAuth(); // useAuth hook 사용하여 signOut 함수 가져오기
  
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(); // 로그아웃 함수 호출
      onClose();
      navigation.navigate('Initial' as never);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style={{borderBottomColor: Colors.text, borderBottomWidth: 1, marginBottom: 10,}}>
            <Text style={styles.titleText}>기타</Text>
          </View>
            <TouchableOpacity onPress={handleLogout} style={styles.itemContainer}>
                <Text style={styles.itemText}> 로그아웃 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}> 그룹탈퇴 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}> 회원탈퇴 </Text>
            </TouchableOpacity>
          <View style={[styles.buttonContainer,{justifyContent: 'flex-end'}]}>
          <TouchableOpacity onPress={onClose} style={[styles.buttonShape, {backgroundColor: Colors.theme}]}>
            <Text style={[styles.buttonText, {color: '#ffffff'}]}>취소</Text>
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
    paddingBottom: 10,
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

export default LogoutAndWithdrawalModal;
