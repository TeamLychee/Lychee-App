import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { patchData } from '../../api/APIs';
import ProfileRegisterModal from './ProfileRegisterModal';
import PenIcon from '../../assets/icons/PenIcon';

const Profile: React.FC = () => {

  const { userToken, loggedUser, getLoggedUser } = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달의 표시 상태를 관리하는 state

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }
    
  //프로필 수정 버튼 함수 
  const editProfile = async (userName: string,  userColor: string) => {
    try {
      // 서버에 업데이트 요청을 보냅니다.
      const updateData = {
        userId : loggedUser.userId,
        userName:  userName,
        userColor: userColor
      };

      console.log('profile Data will be sended: ', updateData);

      const path = `/user/update/setting`;
      const response = await patchData(path, updateData, userToken); // 업데이트할 데이터를 전달합니다.
      console.log('profile Data 서버 응답:', response);

      closeModal(); // 등록 버튼 클릭 후 모달 닫기
      getLoggedUser();
              
    } catch (error) {
      console.error('edit profile 서버 요청 실패:', error);
    }
  };  

  useEffect(() => {
    getLoggedUser();
    console.log('loggedUser', loggedUser);
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View 
            style={{
            backgroundColor: loggedUser.userColor,
            borderRadius: 100,
            width: 25,  
            height: 25}}
        >
        </View>
        <Text style={styles.text}>{loggedUser.userName}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openModal}>
          <PenIcon />
        </TouchableOpacity>
      </View>
      <ProfileRegisterModal isVisible={modalVisible} onClose={closeModal} editProfile={editProfile}/>
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 7,
    alignItems: 'center',
  },

  contentContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 9,
    justifyContent: 'flex-start'
  },

  buttonContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Profile;
