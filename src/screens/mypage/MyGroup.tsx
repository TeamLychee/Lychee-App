import React, { useEffect, useState } from 'react';
import {ScrollView ,  View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PenIcon from '../../assets/icons/PenIcon';

import { useAuth } from '../../auth/AuthContext';
import { UserProps } from './types';
import MyGroupNameRegisterModal from './MyGroupNameRegisterModal';
import { patchData } from '../../api/APIs';

const MyMate: React.FC<UserProps> = ({ userColor, userName }) => {
    return(
      <View style={styles.mateNameContainer}>
        <View 
            style={{
            backgroundColor: userColor,
            borderRadius: 100,
            width: 20,  
            height: 20}}
        >
        </View>
        <Text style={styles.mateNameText}>{userName}</Text>
      </View>
    )
}

const MyGroup: React.FC = () => {
  const { userToken, mates, groupName } = useAuth();
  /*
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달의 표시 상태를 관리하는 state

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }
    
  //프로필 수정 버튼 함수 
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

      closeModal(); // 등록 버튼 클릭 후 모달 닫기
              
    } catch (error) {
      console.error('edit group name 서버 요청 실패:', error);
    }
  }; 
  */

  return (
  <View style={styles.container}>   
    <View>
       {/* 그룹 이름 */}
      <View style={[styles.groupNameContainer]}>
        <View style={styles.groupNameTextContainer}>
          <Text style={styles.title}>{groupName}</Text>
        </View>
        <View style={styles.groupNamebuttonContainer}>
          {/*
          <TouchableOpacity onPress={openModal}>
              <PenIcon/>
          </TouchableOpacity>
          */}
        </View>
      </View>
      {/* 그룹 메이트들 이름 */}
      { mates.length > 0 ? (
        <ScrollView>
        {
          mates.map((mate) => (
            <MyMate 
              key={mate.userId.toString()}
              userId={mate.userId}
              userName={mate.userName} 
              userColor={mate.userColor} 
            />
          ))
        }
        </ScrollView>
      ) : (
        <Text style={styles.text}>
          같이 할 메이트를 초대해보세요!
        </Text>
      )
      } 
    </View> 
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },

  groupNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },

  groupNameTextContainer:{
    alignItems: 'flex-start',
    flex: 9,
  },

  groupNamebuttonContainer: {
    alignItems: 'flex-end',
    marginRight: 2,
    paddingBottom: 7
  },

  mateNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    marginTop: 10,
  },

  mateNameText : {
    fontSize: 16,
    marginLeft: 10,
  }
});

export default MyGroup;


