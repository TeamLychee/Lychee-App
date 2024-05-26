import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '../../common/Colors';
import { useAuth } from '../../auth/AuthContext';
import { patchData } from '../../api/APIs';
import MyGroupNameRegisterModal from './MyGroupNameRegisterModal';
import LogoutAndWithdrawalModal from './LogoutAndWithdrawalModal';
import SendInvitedCode from './SendInvitedCode';
import GroupCodeModal from './GroupCodeModal';

const GroupManaging = () => {
  const { userToken, groupId } = useAuth();
  const [ groupNameModalVisible, setGroupNameModalVisible] = useState<boolean>(false); 
  const [ logoutAndWithdrawalModalVisible, setLogoutAndWithdrawalModalVisible] = useState<boolean>(false); 

  const openGroupNameModal = () => {
    setGroupNameModalVisible(true);
  }

  const closeGroupNameModal = () => {
    setGroupNameModalVisible(false);
  }
  const openLogoutAndWithdrawalModalModal = () => {
    setLogoutAndWithdrawalModalVisible(true);
  }

  const closeLogoutAndWithdrawalModalModal = () => {
    setLogoutAndWithdrawalModalVisible(false);
  }
    
  //그룹 이름 수정 버튼 함수 
  const editGroupName = async (name: string) => {
    try {
      // 서버에 업데이트 요청을 보냅니다.
      const updateData = {
        groupName: name
      };

      console.log('group name Data will be sended: ', updateData);

      const path = `/group/patch`;
      const response = await patchData(path, updateData, userToken); // 업데이트할 데이터를 전달합니다.
      console.log('group name Data 서버 응답:', response);
      closeGroupNameModal(); // 등록 버튼 클릭 후 모달 닫기
              
    } catch (error) {
      console.error('edit group name 서버 요청 실패:', error);
    }
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달의 표시 상태를 관리하는 state

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

    return (
      <View>
        <Text style={styles.title}>그룹 관리</Text>
        <TouchableOpacity onPress={openGroupNameModal}>
          <Text style={styles.text}>그룹 닉네임 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.text}>초대코드 보내기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openLogoutAndWithdrawalModalModal}>
          <Text style={styles.text}>기타</Text>
        </TouchableOpacity>
        <GroupCodeModal isVisible={modalVisible} onClose={closeModal}/>
        <MyGroupNameRegisterModal isVisible={groupNameModalVisible} onClose={closeGroupNameModal} editGroupName={editGroupName}/>
        <LogoutAndWithdrawalModal isVisible={logoutAndWithdrawalModalVisible} onClose={closeLogoutAndWithdrawalModalModal}/>
      </View>
    );
}

const styles = StyleSheet.create({
    title:{
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'flex-start',
      marginVertical: 10,
      marginHorizontal: 10,
    },
  
    text: {
      fontSize: 16,
      alignItems: 'flex-start',
      margin: 10,
    }
});

export default GroupManaging;