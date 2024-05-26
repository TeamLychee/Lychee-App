import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../../common/Colors';
import MateBox from '../../../common/MateBox';
import { getData, postData } from '../../../api/APIs';
import { useAuth } from '../../../auth/AuthContext';
interface MateSpendingProps {
    userId: string;
    userName: string;
    userColor: string;
    spendingNet: number;
    spendingsOnAvg: number;
}

// ModalDialogProps 인터페이스 정의: 모달의 visible 상태와 onClose 함수 타입을 정의
interface AdjustedBudgetInExpenseModalConatinerProps {
    visible: boolean;     // 모달의 표시 여부를 결정하는 boolean 값
    onClose: () => void;  // 모달을 닫는 함수
    mateSpendings: MateSpendingProps[];
    groupSum: number;
    groupAvg: number;
}

const MateSpeding: React.FC<MateSpendingProps> = ({userName, userColor, spendingNet, spendingsOnAvg}) => {    

    const renderMateSpendingsOnAvg = () => {
        let moneyWithSign = spendingsOnAvg.toLocaleString();
        if(moneyWithSign[0]!='-') moneyWithSign = '+'+moneyWithSign;
        return (
            <Text>{'('+moneyWithSign+'원)'}</Text>
        )
    }
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{width: '20%', justifyContent: 'center', paddingLeft: 4}}>
                <MateBox userName={userName} textSize={13} userColor={userColor}/>
            </View>
            <View style={styles.moneyContainer}>
                <Text style={styles.moneyText}>{spendingNet.toLocaleString()+'원'}</Text>
            </View>
            <View style={styles.moneyContainer}>
                <Text style={styles.moneyText}>{renderMateSpendingsOnAvg()}</Text>
            </View>
        </View>
    )
}

const AdjustedBudgetsInExpenseModalConatiner: React.FC<AdjustedBudgetInExpenseModalConatinerProps> = ({ visible, onClose, mateSpendings, groupSum, groupAvg}) => {

    const { userToken, mates } = useAuth();

    //정산 알림 보내기 api
    const getCalcInNoticification = async () => {
        try {
          const path = '/budget/calc';
          const response = await getData<void>(path, userToken);
          console.log('getCalcInNoticification responce', response);
        } catch (error) { 
            if (error instanceof TypeError) {
              // TypeError 타입의 에러 처리
             // console.error('getCalcInNoticification TypeError:', error);
            } else if (error instanceof ReferenceError) {
              // ReferenceError 타입의 에러 처리
             // console.error('getCalcInNoticification ReferenceError:', error);
            } else {
              // 다른 모든 에러 처리
            //  console.error('getCalcInNoticification Unknown Error:', error);
            }
        }
      }

    const handleGetCalcInNoticification = () => {
        if(mateSpendings.length < (mates.length+1)) {
            Alert.alert('모든 메이트가 지출을 등록해야 정산할 수 있습니다. 0원 등록을 꼭 해주세요!');
        } else {
            getCalcInNoticification();
            onClose();
        }
    }

    return (
        <Modal
            visible={visible}             
            transparent={true}           
            animationType="fade"          
        >
           
            <TouchableOpacity 
                style={styles.overlay}    
                activeOpacity={1}           
                onPressOut={onClose}       
            >
                <View style={[styles.container]}>
                    <Text style={styles.title}> 정산 내역 </Text>
                    <View style={styles.content}>
                        { mateSpendings.map((mateSpending, index) => (
                            <MateSpeding 
                                key={index.toString()}
                                userId={mateSpending.userId}
                                userName={mateSpending.userName}
                                userColor={mateSpending.userColor}
                                spendingNet={mateSpending.spendingNet}
                                spendingsOnAvg={mateSpending.spendingsOnAvg}
                            />
                            ))
                        }
                    </View>
                    <View style={[styles.content, {flexDirection: 'row'}]}>
                        {/*groupMemberSpending 과 간격 맞추기 위한 컴포넌트 */}
                        <View style={{width: '20%'}} />
                        <View style={styles.moneyContainer}>
                            <Text style={styles.moneyText}>{groupSum.toLocaleString()+'원'}</Text>
                        </View>
                        <View style={styles.moneyContainer}>
                            <Text style={styles.moneyText}>{'('+groupAvg.toLocaleString()+'원)'}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={[styles.buttonText, {color: Colors.text}]}> 취소 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.roundedbutton}
                            onPress={handleGetCalcInNoticification}
                        >
                            <Text style={styles.buttonText}> 정산알림 보내기 </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: '90%',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
   
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    content: {
        borderTopWidth: 1,
        paddingVertical: 10,
        borderColor: Colors.text,
        marginTop: 5,
        width: '100%',
    },

    moneyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
   
    moneyText: {
        fontSize: 20,
        marginVertical: 5,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
    },

    roundedbutton: {
        borderRadius: 7,
        backgroundColor: Colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        height: 29,
        marginLeft: 5,
        paddingHorizontal: 4,
    },
    
    buttonText: {
        fontSize: 14,
        color: '#ffffff',
    },

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
});

export default AdjustedBudgetsInExpenseModalConatiner;
