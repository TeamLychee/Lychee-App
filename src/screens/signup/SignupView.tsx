import { SafeAreaView, TextInput } from 'react-native';
import { Colors } from '../../common/Colors';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SignupViewProps {
  signup: (email: string, password: string, userName:string, birth: string, sex: string ) => void;
}

const SignupView: React.FC<SignupViewProps> = ({signup}) => {
  const [userName, setUserName] = useState<string>('');
  const [sex, setSex] = useState<'female' | 'male'>('female');
  const [birth, setBirth] = useState<Date>(new Date());
  const [emailId, setEmailId] = useState<string>('');
  const [emailDomain, setEmailDomain] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const handleBirth = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birth;
    setBirth(currentDate);
  };

  useEffect(() => {
    // 모든 입력 필드가 비어있지 않은지 확인
    const foundEmpty = () => {
      return (emailId !== '' && emailDomain !== '' && password !== '' && userName !== '') ? false : true;  
    };
    // foundEmpty 함수의 결과에 따라 isEmpty 상태 업데이트
    setIsEmpty(foundEmpty());
  }, [emailId, emailDomain, password, userName]); 

  const handleSignup = () => {
    if(!isEmpty) {
      const newEmail = emailId+'@'+emailDomain;
      const newBirth = birth.toISOString().substring(0, 10);
      signup(newEmail, password, userName, newBirth, sex); 
      setBirth(new Date());
      setUserName('');
      setEmailId('');
      setEmailDomain('');
      setPassword('');
      setSex('female');
    }
  }

  return (  
      <SafeAreaView 
        style={[styles.safeArea, !isEmpty && {backgroundColor: Colors.theme}]}
      > 
      <View style={styles.content}>
          {/* email */}
          <View style={[styles.titleContainer, {marginTop: 60}]}>
            <Text style={styles.title}>아이디</Text>
            <Text style={{marginTop: 6, fontSize: 12, color: Colors.text}}>아이디로 쓰실 이메일을 입력해주세요</Text>
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
          <View style={{flex: 1}}>
            <TextInput
              style={[styles.textInput]}
              placeholder="id"
              value={emailId}
              onChangeText={(text) => {
                setEmailId(text);
              }}
              placeholderTextColor={Colors.text}
            />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.title}>@</Text>
            </View>
            <View style={{flex: 1}}>
            <TextInput
              style={[styles.textInput]}
              placeholder="gmail.com"
              value={emailDomain}
              onChangeText={(text) => {
                setEmailDomain(text);
              }}
              placeholderTextColor={Colors.text}
            />
            </View>
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
        
        {/* 닉네임 */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>닉네임</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput]}
              placeholder="닉네임을 입력해주세요"
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
              }}
              placeholderTextColor={Colors.text}
          />
          </View>
        
        {/* birth */}
        <View style={{flexDirection: 'row', marginHorizontal: 15, marginTop: 15, marginBottom: 40, alignItems: 'center'}}>
          <Text style={[styles.title, {}]}>생일</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={birth}
            mode="date"
            display="default"
            onChange={handleBirth}
            locale="ko_KR"
          />
        </View>

        {/* sex */}
        <View style={{flexDirection: 'row', marginHorizontal: 15, marginTop: 15, marginBottom: 40, alignItems: 'center'}}>
          <Text style={[styles.title, {marginRight: 20}]}>성별</Text>
          <TouchableOpacity 
            style={[styles.sexButton, sex === 'female' && {backgroundColor: Colors.theme}]}
            onPress={() => setSex('female')}
          >
            <Text 
              style={[styles.sexButtonText, sex === 'female' && {color: '#fff'}]}
            >여</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sexButton, sex === 'male' && {backgroundColor: Colors.theme}]}
            onPress={() => setSex('male')}
          >
            <Text
              style={[styles.sexButtonText, sex === 'male' && {color: '#fff'}]}
            >남</Text>
          </TouchableOpacity>
        </View>
        {/* 가입 버튼 */}
        <TouchableOpacity 
          style={[styles.button, !isEmpty && {backgroundColor: Colors.theme}]}
          onPress={handleSignup}
        >
          <Text 
            style={[styles.buttonText, !isEmpty && {color: '#fff'}]}
          >가입하기</Text>
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

  sexButton: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    height: 35,
    alignItems: 'center',
    backgroundColor: Colors.textInputField,
  },

  sexButtonText: {
    fontSize: 16,
    color: '#000',
  },

});

export default SignupView;
