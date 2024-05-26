import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Colors } from './Colors';
import PlusIcon from '../assets/icons/PlusIcon';

const RoundPlusButton: React.FC = () => {

  return (
    <View style={styles.plusButtonCotainer}>
        <View style={styles.plusButton}>
          <PlusIcon />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
      plusButtonCotainer:{
        zIndex: 3, // 가장 앞에 위치
        position: 'absolute',
        bottom: 90,
        width: '95%',
        alignItems: 'flex-end',
      },
    
      plusButton:{
        backgroundColor: Colors.theme,
        borderRadius: 100,
        width: 56,  
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
      },
});

export default RoundPlusButton;
