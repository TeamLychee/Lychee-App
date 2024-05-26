
//  BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../common/Colors';
import CommonStyles from '../common/CommonStyles';

import ExpenseContainer from '../screens/expense/ExpenseContainer';
import CalenderContainer from '../screens/calender/CalenderContainer';
import NoticificationContainer from '../screens/noticification/NoticificationContainer';
import HomeContainer from '../screens/home/HomeContainer';
import MypageView from '../screens/mypage/MypageView';

import ExpenseIcon from '../assets/icons/navigaton/ExpenseIcon';
import HomeIcon from '../assets/icons/navigaton/HomeIcon';
import CalenderIcon from '../assets/icons/navigaton/CalenderIcon';
import NoticificationIcon from '../assets/icons/navigaton/NoticificationIcon';
import MypageIcon from '../assets/icons/navigaton/MypageIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({}) => {
  return (
    <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: { 
          position: 'absolute',  
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          ...CommonStyles.shadow,
          paddingTop: 20,
          paddingBottom: 20,
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.theme,
        tabBarInactiveTintColor: Colors.button,
      }}
    >
      <Tab.Screen 
        name="Expense" 
        component={ExpenseContainer} 
        options={
          {
            tabBarLabel: '가계부',
            tabBarIcon: ({focused, color}) => (
              <View style={styles.iconContainer}>
                <ExpenseIcon focused={focused} color={color}/>
              </View>
            ),
            tabBarIconStyle: {
              color: 'red',
            }
          }
        } 
      />
      <Tab.Screen 
        name="Calender" 
        component={CalenderContainer}
        options={
          {
            tabBarLabel: '캘린더',
            tabBarIcon: ({focused, color}) => (
              <View style={styles.iconContainer}>
                <CalenderIcon focused={focused} color={color}/>
              </View>
            ),
            
          }
        } 
      />
      <Tab.Screen 
        name="Home" 
        component={HomeContainer} 
        options={
          {
            tabBarLabel: '홈',
            tabBarIcon: ({focused, color}) => (
              <View style={styles.iconContainer}>
                <HomeIcon focused={focused} color={color}/>
              </View>
            ),
          }
        } 
      />
      <Tab.Screen 
        name="Noticification" 
        component={NoticificationContainer} 
        options={
          {
            tabBarLabel: '알림',
            tabBarIcon: ({focused, color}) => (
              <View style={styles.iconContainer}>
                <NoticificationIcon focused={focused} color={color}/>
              </View>
            ),

          }
        }
      />
      <Tab.Screen 
        name="Mypage" 
        component={MypageView} 
        options={
          {
            tabBarLabel: '마이페이지',
            tabBarIcon: ({focused, color}) => (
              <View style={styles.iconContainer}>
                <MypageIcon focused={focused} color={color} />
              </View>
            ),
          }
        }
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingBottom: 20,
  }
});

export default BottomTabNavigator;