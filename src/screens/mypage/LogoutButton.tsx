import { Colors } from '../../common/Colors';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../auth/AuthContext';

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth(); // useAuth hook 사용하여 signOut 함수 가져오기
  
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(); // 로그아웃 함수 호출
      navigation.navigate('Initial' as never);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
        <Text> 로그아웃 </Text>
    </TouchableOpacity>
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
    minHeight: 360,
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

export default LogoutButton;
