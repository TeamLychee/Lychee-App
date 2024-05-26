// components/Login.tsx
import React, { useState } from 'react';
import LoginView from './LoginView';
import { postData } from '../../api/APIs';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../auth/AuthContext';

const Login: React.FC = () => {

  const { userToken, signIn, groupId } = useAuth(); 
  
  const navigation = useNavigation();

  const login = async (email: string, password: string) => {
    // JSON 데이터 생성
    const loggingUser = {
      email,
      password,
    };
    console.log('loggingUser will be sended: ', loggingUser);

    try {
      // addData 함수를 사용하여 서버에 POST 요청
      const path = '/login'; // 요청을 보낼 경로
      const response = await postData<typeof loggingUser, any>(path, loggingUser, userToken);
      
      await signIn(response.data);

      console.log('loggingUser 서버 응답:', response);

      if (response.ok) { // 200일때
        if(groupId==='aaaaaa') {
          navigation.navigate('EntryGroup' as never);
        } else {
          navigation.navigate('BottomTabNavigator' as never);
        }
      }

    } catch (error) {
      Alert.alert('', '로그인에 실패했습니다!', [{ text: '확인' }]);
      console.error('loggingUser 서버 요청 실패:', error);
    }
  };

  return (
   <LoginView login={login} />
  );
};

export default Login;
