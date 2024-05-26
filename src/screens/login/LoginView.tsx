import { Alert, SafeAreaView, TextInput } from 'react-native';
import { Colors } from '../../common/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LoginViewProps {
  login: (email: string, password: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({login}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    // 모든 입력 필드가 비어있지 않은지 확인
    const foundEmpty = () => {
      return (email !== '' && password !== '') ? false : true;  
    };
    // foundEmpty 함수의 결과에 따라 isEmpty 상태 업데이트
    setIsEmpty(foundEmpty());
  }, [email, password]); 

  const handleLogin = () => {
    if(!isEmpty) {
      login(email, password); 
      setEmail('');
      setPassword('');
      setIsEmpty(true);
    }
  }

  return (  
      <SafeAreaView 
        style={[styles.safeArea, !isEmpty && {backgroundColor: Colors.theme}]}
      > 
      <View style={styles.content}>
        {/* email(id)*/}
       <View style={[styles.titleContainer, {marginTop: 60}]}>
          <Text style={styles.title}>아이디</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput]}
              placeholder="이메일을 입력해주세요"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholderTextColor={Colors.text}
          />
          </View>
        
        {/* Pw */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>비밀번호</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput]}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholderTextColor={Colors.text}
          />
          </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity 
          style={[styles.button, !isEmpty && {backgroundColor: Colors.theme}]}
          onPress={handleLogin}
        >
          <Text 
            style={[styles.buttonText, !isEmpty && {color: '#fff'}]}
          >로그인</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.textInputField,
  },

  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  titleContainer: {
    justifyContent: 'center',
    marginVertical: 15,
    marginHorizontal: 15,
  },

  inputContainer:{
    justifyContent: 'center',
    marginBottom: 40,
    marginHorizontal: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '500'
  },

  textInput: {
    borderRadius: 9,
    padding: 5,
    backgroundColor: Colors.textInputField,
    minHeight: 35,
  },

  button: {
    padding: 10,
    paddingTop: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.textInputField,
    position: 'absolute',
    bottom: 0,
  },

  buttonText: {
    fontSize: 18,
    color: '#000',
  },

});

export default LoginView;
