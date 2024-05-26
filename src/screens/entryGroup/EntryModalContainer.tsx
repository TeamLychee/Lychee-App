import React from 'react';
import { postData, patchData } from '../../api/APIs';
import EntryModalView from './EntryModalView';
import { modeType } from './Types';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../auth/AuthContext';

interface EntryModalContainerProps {
  mode: modeType;
  isVisible: boolean;
  groupId?: string;
  onClose: () => void;
}

const EntryModalContainer: React.FC<EntryModalContainerProps> = ({ mode, groupId, isVisible, onClose}) => {
  
  const { userToken } = useAuth();
  
  const navigation = useNavigation();

  const handleCancel = () => {
    onClose();
  };

  {/*entryNew */}
  const entryNew = async (content: string) => {
    console.log('EntryModal mode: new');
      // JSON 데이터 생성
      const newGroupName = {
        groupName: content,
      };
      console.log('entryNew will be sended: ', newGroupName);
  
      try {
        // addData 함수를 사용하여 서버에 POST 요청
        const path = '/group/create'; 
        const response = await postData<typeof newGroupName, any>(path, newGroupName, userToken);
        console.log('entryNew 서버 응답:', response);
        if(response.code) {
          navigation.navigate('BottomTabNavigator' as never);
        }
      } catch (error) {
        console.error('entryNew 서버 요청 실패:', error);
      }
  };

  {/*entryExisting */}
  const entryExisting = async (content: string) => {
    console.log('EntryModal mode: existing');
      // JSON 데이터 생성
      const inviteCode = {
        groupId: content,
      };
      console.log('entryExisting groupId will be sended: ', inviteCode);
      try {
        const path = '/group/insert'; 
        const response = await patchData<typeof inviteCode, any>(path, inviteCode, userToken);
        console.log('entryExisting  서버 응답:', response);
        if(response.code) {
          navigation.navigate('BottomTabNavigator' as never);
        }
      } catch (error) {
        console.error('entryExisting 서버 요청 실패:', error);
      }
  };

  const entryGroup = mode === 'new' ? entryNew : entryExisting;

  return (
    <EntryModalView
      mode={mode}
      isVisible={isVisible} 
      handleCancel={handleCancel} 
      entryGroup={entryGroup} 
    />
  );
};

export default EntryModalContainer;
