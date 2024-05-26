import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// ModalDialogProps 인터페이스 정의: 모달의 visible 상태와 onClose 함수 타입을 정의합니다.
interface ModalDialogProps {
    visible: boolean;     // 모달의 표시 여부를 결정하는 boolean 값
    onClose: () => void;  // 모달을 닫는 함수
    screenComponent: React.ReactNode; // Screen 컴포넌트를 받을 prop 추가
}

// ModalDialog 함수형 컴포넌트: ModalDialogProps 인터페이스를 props로 사용합니다.
const ModalDialog: React.FC<ModalDialogProps> = ({ visible, onClose, screenComponent }) => {
    return (
        // Modal 컴포넌트: visible과 transparent 속성을 설정합니다.
        <Modal
            visible={visible}               // 모달의 표시 여부
            transparent={true}             // 투명 배경을 사용하여 모달 뒤의 내용이 보이도록 설정
            animationType="fade"           // 모달 등장 애니메이션 타입을 fade로 설정
        >
            {/* TouchableOpacity 컴포넌트: 사용자가 터치하면 onClose 함수가 호출되도록 설정 */}
            <TouchableOpacity 
                style={styles.overlay}     // overlay 스타일 적용
                activeOpacity={1}           // 터치 시 투명도 변경 없음
                onPressOut={onClose}        // 터치가 끝날 때 onClose 함수 실행
            >
                <View>
                    <Text>
                        <View>{screenComponent}</View> {/* 전달된 Screen 컴포넌트 렌더링 */}
                    </Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

// StyleSheet.create를 사용하여 스타일 정의
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
});

export default ModalDialog;
