import React, { useState, useEffect } from 'react';
import { AdjustedResultItemProps } from '../Types';
import AdjustedBudgetInNoticificationView from './AdjustedBudgetInNoticificationView';
import { useAuth } from '../../../auth/AuthContext';
import { getData, patchData } from '../../../api/APIs';
interface FinalData {
    LastCalculatedDate: string;
    AdjustedResult: AdjustedResultItemProps[];
}

interface AdjustedBudgetInNoticificationContainerProps {
}

const AdjustedBudgetInNoticificationContainer: React.FC<AdjustedBudgetInNoticificationContainerProps> = ({}) => {

    const [lastCalculatedDate, setLastCalculatedDate] = useState<string>('');
    const [adjustedBudgetData, setAdjustedBudgetData] = useState<AdjustedResultItemProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const { userToken } = useAuth();
    
    const getAdjustedBudgets = async () => {
        try {
            const path = '/budget/calc/adjnoti';
            const serverData = await getData<FinalData>(path, userToken);
            console.log('/budget/calc/adjnoti serverData', serverData);
            setLastCalculatedDate(serverData.LastCalculatedDate);
            setAdjustedBudgetData(serverData.AdjustedResult);
        } catch (error) {
            if (error instanceof TypeError) {
            // TypeError 타입의 에러 처리
          //  console.error('budgets TypeError:', error);
            } else if (error instanceof ReferenceError) {
            // ReferenceError 타입의 에러 처리
          // console.error('budgets ReferenceError:', error);
            } else {
            // 다른 모든 에러 처리
           // console.error('budgets Unknown Error:', error);
            }
        }
    };

    const patchAdjustedBudgets = async () => {
        try {
          const path = '/budget/done';
          const response = await patchData(path, undefined, userToken); // 업데이트할 데이터를 전달합니다.
          console.log('patchAdjustedBudgets 서버 응답:', response);
          getAdjustedBudgets();
        
        } catch (error) {
         // console.error('patchAdjNoti 서버 요청 실패:', error);
        }
    };

    // 새로고침 동작을 처리하는 함수
    const onRefresh = () => {
        setRefreshing(true);
        getAdjustedBudgets(); // 데이터를 다시 가져옴
        setRefreshing(false); // 새로고침 완료 후 refreshing 상태 변경
    };

    useEffect(() => {
        getAdjustedBudgets();
    }, []);

    return (
        <AdjustedBudgetInNoticificationView 
            lastCalculatedDate={lastCalculatedDate} 
            adjustedResult={adjustedBudgetData}
            refreshing={refreshing}
            patchAdjustedBudgets={patchAdjustedBudgets}
            onRefresh={onRefresh}
        />
    );
};


export default AdjustedBudgetInNoticificationContainer;

