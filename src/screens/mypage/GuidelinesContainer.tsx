import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../common/Colors';
import CommonStyles from '../../common/CommonStyles';

const Guidelines = () => {
    return (
      <View>
        <Text style={styles.title}>이용 안내</Text>
        <TouchableOpacity>
          <Text style={styles.text}>개인정보 처리방침</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>서비스 이용약관</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>오픈소스 라이브러리</Text>
        </TouchableOpacity>
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

export default Guidelines;