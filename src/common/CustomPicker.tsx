import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Item {
    label: string;
    value: string;
}

interface CustomPickerProps {
    items: Item[];
    setSelectedItem: (item: string) => void;
}

interface CustomPickerModalProps extends CustomPickerProps{
    visible: boolean;     // 모달의 표시 여부를 결정하는 boolean 값
    handleCancel: () => void;  // 모달을 닫는 함수
}

const CustomModalPicker: React.FC<CustomPickerModalProps> = ({ visible, items, setSelectedItem, handleCancel}) => {
    return (
        // Modal 컴포넌트: visible과 transparent 속성을 설정합니다.
        <Modal
            visible={visible}              
            transparent={true}            
        >   
                <View style={styles.container}>
                <TouchableOpacity 
                    onPress={handleCancel}>
                <Text>뒤로</Text>
                </TouchableOpacity>
                <ScrollView>
                    {items.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => setSelectedItem(item.value)} >
                        <Text>{item.label}</Text>
                        <Text>{item.value}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                </View>
        </Modal>
    );
};

const CustomPicker: React.FC<CustomPickerProps> = ({items, setSelectedItem}) => {
    const [pickerVisible, setPickerVisible] = useState<boolean>(false);
    const openPicker = () => {
        setPickerVisible(true);
    }
    const handleCancel = () => {
        setPickerVisible(false);
    }
    return (
        <View>
            <TouchableOpacity
              onPress={openPicker}
            >
            <Text>
            주기 고르세요
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
            >
            <Text>
            접기
            </Text>
            </TouchableOpacity>
            <CustomModalPicker visible={pickerVisible} handleCancel={handleCancel} items={items} setSelectedItem={setSelectedItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'red',
        width: 30,
        height: 200,
        top: 100,
        left: 100,
    }
});

export default CustomPicker;
