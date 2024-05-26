import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors } from './common/Colors';
import InitialStackNavigator from './navigations/InitialStackNavigator';
import AuthProvider from './auth/AuthContext';

const Index: React.FC = () => (
    <AuthProvider>
        <NavigationContainer >  
          <View style={styles.container}>
            <InitialStackNavigator />
          </View>
        </NavigationContainer>
    </AuthProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, // 이 부분은 뷰가 전체 화면을 채우도록 합니다.
    backgroundColor: Colors.background, // 여기에 원하는 배경색을 설정합니다.
  },
});

export default Index;
