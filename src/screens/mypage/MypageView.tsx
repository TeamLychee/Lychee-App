import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../common/Colors';
import CommonStyles from '../../common/CommonStyles';
import ProfileContainer from './ProfileContainer';
import MyGroup from './MyGroup';
import GroupManagingContainer from './GroupManagingContainer';
import GuidelinesContainer from './GuidelinesContainer';

const MypageView: React.FC = () => {

  return (
    <View style={CommonStyles.baseContainer}>
      <SafeAreaView style={CommonStyles.safearea}>
          <View 
            style={[CommonStyles.section, {minHeight: 700, marginTop: 15}]}
          >
            <ScrollView>
              {/* 프로필 */}
              <View style={[CommonStyles.generalBox]}>
                  <ProfileContainer />
              </View>

              {/* 그룹 정보, 메이트들 */}
              <View style={CommonStyles.generalBox}>
                  <MyGroup />
              </View>

              {/* 그룹 관리 */}
              <View style={CommonStyles.generalBox}>
                  <GroupManagingContainer />
              </View>

              {/* 이용안내 */}
              <View style={CommonStyles.generalBox}>
                  <GuidelinesContainer />
              </View>
            </ScrollView>
        </View>

        {/* roundBox */}
        <View style={[styles.roundBox, {height: 250}]}></View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  roundBox: {
    zIndex: 1, // 낮은 zIndex로 뒤에 위치
    backgroundColor: Colors.theme,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: 'absolute',
    width: '100%', // 너비 
  },

  LogoutBox:{
    width: '100%', 
    alignItems: 'center',
    margin: 10,
  },

  LogoutText:{
    color: Colors.text,
    fontSize: 15,
  }
});

export default MypageView;
