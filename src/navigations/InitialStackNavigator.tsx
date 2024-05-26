// InitialStackNavigator.tsx
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginContainer from '../screens/login/LoginContainer';
import BottomTabNavigator from './BottomTabNavigator';
import EntryGroupContainer from '../screens/entryGroup/EntryGroupContainer';
import { Colors } from '../common/Colors';
import SignupContainer from '../screens/signup/SignupContainer';
import InitialContainer from '../screens/initial/InitialContainer';
import { useAuth } from '../auth/AuthContext';

const Stack = createStackNavigator();

const InitialStackNavigator: React.FC = () => {

  const {userToken, groupId} = useAuth();

  const [isDefault, setIsDefault] =  useState<boolean>(false);

  useEffect(() => {
    const data = groupId == 'aaaaaa' ? true : false;
    setIsDefault(data);
  }, [userToken, groupId]);

  return (
    <Stack.Navigator>
      { userToken ? (
        <>
          { !isDefault ? (
            <Stack.Screen 
              name="BottomTabNavigator" 
              component={BottomTabNavigator} 
              options={{ headerShown: false }}
            />
          ) : (
            <>
            <Stack.Screen 
              name="EntryGroup" 
              component={EntryGroupContainer}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="BottomTabNavigator" 
              component={BottomTabNavigator} 
              options={{ headerShown: false }}
            />
            </>
          )}
        </>
      ) : (
      <>
      <Stack.Screen 
        name="Initial"
        component={InitialContainer} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginContainer} 
        options={{
          headerStyle: {
            backgroundColor: '#fff', // 헤더의 배경색 설정
          },
          headerTintColor: Colors.theme, // 헤더의 텍스트 색상 설정
          headerTitleStyle: {
            color: '#000',
          },
          headerTitle: "로그인", // 헤더 타이틀 직접 설정
          headerBackTitle: '처음으로',
        }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupContainer}
        options={{
          headerStyle: {
            backgroundColor: '#fff', // 헤더의 배경색 설정
          },
          headerTintColor: Colors.theme, // 헤더의 텍스트 색상 설정
          headerTitleStyle: {
            color: '#000',
          },
          headerTitle: "회원가입", // 헤더 타이틀 직접 설정
          headerBackTitle: '처음으로',
        }}
      />
      <Stack.Screen 
        name="BottomTabNavigator" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }}
      />
      </>
      )}
    </Stack.Navigator>
  );
}

export default InitialStackNavigator;
