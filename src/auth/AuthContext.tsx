// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../api/APIs';
import { UserProps } from '../screens/mypage/types';

interface AuthContextType {
  userToken: string | null;
  loggedUser: UserProps;
  mates: UserProps[];
  groupId: string;
  groupName: string;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  getLoggedUser: () => void;
  getMates: () => void;
  getGroupInfo: ()=> void;
}
// 초기 상태와 함께 Context 생성
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const defaultUser = {userId:'', userName:'', userColor:''};

  const [userToken, setUserToken] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<UserProps>(defaultUser);
  const [mates, setMates] = useState<UserProps[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  
  const signIn = async (token: string) => {
    // 토큰 저장 로직
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (e) {
      console.error('Failed to sign in', e);
    }
  };

  const signOut = async () => {
    // 토큰 제거 로직
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('logout sucess')
      setUserToken(null);
      setLoggedUser(defaultUser);
      setMates([]);
    } catch (e) {
     // console.error('Failed to sign out', e);
    }
  };

  {/* 추후 수정. /user/all 부분으로. 본인 제외 유저만 보내게 */}
  const getMates = async () => {
    try {
      const path = '/user/mypage';
      const serverData = await getData<
      {
        code: number,
        message: string,
        data: {
          userId: string,
          userName: string,
          userColor: string,
          groupName: string,
          membernamesandcolors: UserProps[]
        }
      }>(path, userToken);

      const data = serverData.data.membernamesandcolors;
      console.log('mates ', data);
      setMates(data);
    } catch (error) {
        if (error instanceof TypeError) {
          // TypeError 타입의 에러 처리
          console.error('getMates TypeError:', error);
        } else if (error instanceof ReferenceError) {
          // ReferenceError 타입의 에러 처리
          console.error('getMates ReferenceError:', error);
        } else {
          // 다른 모든 에러 처리
          console.error('getMates Unknown Error:', error);
        }
    }
  };

  const getLoggedUser = async () => {
    try {
      const path = '/user/setting';
      const serverData = await getData<
      {
        code: number,
        message: string,
        data: {
          userId: string,
          userName: string,
          userColor: string,
        } 
      }>(path, userToken);
      
      console.log('loggedUser', serverData);

      const data = serverData.data;

      setLoggedUser(data);

    } catch (error) {
        if (error instanceof TypeError) {
          // TypeError 타입의 에러 처리
          console.error('getMy TypeError:', error);
        } else if (error instanceof ReferenceError) {
          // ReferenceError 타입의 에러 처리
          console.error('getMy ReferenceError:', error);
        } else {
          // 다른 모든 에러 처리
          console.error('getMy Unknown Error:', error);
        }
    }
  };

  const getGroupInfo = async () => {
    try {
      const path = '/group/invitation';
      const serverData = await getData<
      {
        code: number,
        message: string,
        data: {
          groupId: string,
          groupName: string
        } 
      }>(path, userToken);
      
      console.log('groupInfo: ', serverData.data);

      const groupId = serverData.data.groupId;
      const groupName = serverData.data.groupName;

      setGroupId(groupId);
      setGroupName(groupName);

    } catch (error) {
        if (error instanceof TypeError) {
          // TypeError 타입의 에러 처리
          console.error('/group/invitation TypeError:', error);
        } else if (error instanceof ReferenceError) {
          // ReferenceError 타입의 에러 처리
          console.error('/group/invitation ReferenceError:', error);
        } else {
          // 다른 모든 에러 처리
          console.error('/group/invitation Unknown Error:', error);
        }
    }
  };

  const bootstrapAsync = async () => {
    let token: string | null = null;
    try {
      token = await AsyncStorage.getItem('userToken');
      console.log('usertoken', token);
      if (token) {
      }
    } catch (e) {
      // 토큰 로드 실패 처리
      console.error('Failed to load token', e);
    }
    setUserToken(token);
  };

  useEffect(() => {
    bootstrapAsync();
  }, []);

  useEffect(() => {
    if(userToken){
      getLoggedUser();
      getGroupInfo();
      getMates();
    } else {
      setLoggedUser(defaultUser)
      setMates([]);
      setGroupId('');
      setGroupName('');
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ 
      userToken, 
      loggedUser, 
      mates,
      groupId,
      groupName,
      getGroupInfo,
      getMates,
      getLoggedUser,
      signIn, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export default AuthProvider;
