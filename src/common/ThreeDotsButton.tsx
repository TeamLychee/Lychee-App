import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Colors } from './Colors';
import ThreeDotsIcon from '../assets/icons/ThreeDotsIcon';
//import EditAndDeleteButton from './EditAndDeleteButton';

interface ThreeDotsButtonProps {
  openModal?: () => void;
  setEditButtonVisible?: (isVisible: boolean) => void;
}

const ThreeDotsButton: React.FC<ThreeDotsButtonProps> = ({ openModal, setEditButtonVisible }) => {
    
    const [isFocused, setIsFocused] = useState(false);

    //버튼 함수
    const buttonPress = (title: string) => {
        console.log(`${title} 버튼이 클릭되었습니다.`);
        if (openModal) {
        openModal();
        }
        if(setEditButtonVisible){
            setEditButtonVisible(true);
        }
    };

  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity
    onPressIn={() => setIsFocused(true)}
    onPressOut={() => setIsFocused(false)}
    onPress={() => buttonPress("threedots")}
    style={[styles.buttonContainer, isFocused && styles.focused]}
    >
        <ThreeDotsIcon color={Colors.button} />   
    </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    plusButtonCotainer:{
        zIndex: 3, // 가장 앞에 위치
        position: 'absolute',
        bottom: '1%',
        width: '95%',
        alignItems: 'flex-end',
      },

    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: 20,
        height: 20,
        borderRadius: 50,
    },  

    focused: {
        backgroundColor: 'rgba(181, 181, 181, 0.4)', //포커스 시 배경색
    },    
});

export default ThreeDotsButton;
