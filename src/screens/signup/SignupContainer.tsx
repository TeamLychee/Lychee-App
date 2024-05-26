import React from 'react';
import SignupView from './SignupView';
import { postData } from '../../api/APIs';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useAuth } from '../../auth/AuthContext';

const SignupContainer = () => {

  const {userToken} = useAuth();
  const navigation = useNavigation();
  
  const signup = async (email: string, password: string, userName: string, birth: string, sex: string) => {
      // JSON 데이터 생성
      const newUser = {
        email,
        password,
        userName,
        birth,
        sex,
      };
      console.log('handleSignup Data will be sended: ', newUser);
  
      try {
        // addData 함수를 사용하여 서버에 POST 요청
        const path = '/signup'; // 요청을 보낼 경로
        const response = await postData<typeof newUser, any>(path, newUser, userToken);
        console.log('handleSignup 서버 응답:', response);
        if (response.code) { // 200일때
          Alert.alert('', '회원가입에 성공했습니다!', 
            [{  text: '확인',
                onPress: () => navigation.navigate('Initial' as never)
            }]
          );
        } 
      } catch (error) {
          Alert.alert('', '회원가입에 실패했습니다!', [{ text: '확인' }]);
          console.error('handleSignup 서버 요청 실패:', error);
      }
  };

  return (  
    <SignupView signup={signup}/>
  )
}

export default SignupContainer;