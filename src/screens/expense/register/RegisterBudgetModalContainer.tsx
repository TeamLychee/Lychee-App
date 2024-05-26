import React, { useEffect, useState } from 'react';
import RegisterBudgetModalView from './RegisterBudgetModalView';
import { postData, patchData, deleteData } from '../../../api/APIs';
import { Alert } from 'react-native';
import { useAuth } from '../../../auth/AuthContext';
import { BudgetProps, modeType } from '../Types';

interface RegisterBudgetModalContainerProps {
  mode: modeType;
  isVisible: boolean;
  editingBudget: BudgetProps | null;
  onClose: () => void;
  getBudgets: () => void;
}

const RegisterBudgetModalContainer: React.FC<RegisterBudgetModalContainerProps> = ({ mode, getBudgets, isVisible, onClose, editingBudget}) => {

  console.log('RegisterBudget mode:', mode); 

  const { userToken } = useAuth();

  const [id, setId] = useState<string>('');

  useEffect(() => {
    if(editingBudget) setId(editingBudget.id.toString());
    console.log('RegisterBudgetModal id:', id);
  }, [editingBudget]);

  const addBudget = async (content: string, price: number, category: string, subCategory: string) => {
      // JSON 데이터 생성
      const newBudget = {
        spendingName: content,
        spendings: price,
        category: category,
        subCategory: subCategory,
      };
      console.log('budget Data will be sended: ', newBudget);
      try {
        // addData 함수를 사용하여 서버에 POST 요청
        const path = '/budget'; // 요청을 보낼 경로
        const response = await postData<typeof newBudget, any>(path, newBudget, userToken); // 여기서 응답 데이터 타입은 실제 응답에 맞게 수정해야 합니다.
  
        console.log('add Budget 서버 응답:', response);
        onClose(); // 등록 버튼 클릭 후 모달 닫기
        getBudgets(); // 게시글 목록 새로고침

      } catch (error) {
        console.error('add Budget 서버 요청 실패:', error);
      }
  };
  
  const editBudget = async (content: string, price: number, category: string, subCategory: string) => {
      try {
        // 서버에 업데이트 요청을 보냅니다.
        const updateBudget = {
          spendingName: content,
          spending: price,
          category: category,
          subCategory: subCategory,
        };
      console.log('budget Data will be sended: ', updateBudget);

        const path = `/budget/update/${id}`;
        const response = await patchData(path, updateBudget, userToken); // 업데이트할 데이터를 전달합니다.
        console.log('edit budget 서버 응답:', response);

        onClose(); // 등록 버튼 클릭 후 모달 닫기
        console.log('getBudgets')
        getBudgets(); // 게시글 목록 새로고침
                
      } catch (error) {
        console.error('edit budget 서버 요청 실패:', error);
      }
  };

  const deleteBudget = async () => {
    try {
      const path = '/budget/'+id;
      await deleteData(path, userToken);
      console.log(id, 'deleteBudget 완료');
      onClose();
      getBudgets();
    } catch (error) {
      console.error('deleteBudget 실패:', error);
    }
  };

  const regesterBudget = mode === 'edit' ? editBudget : addBudget;

  return (
    <RegisterBudgetModalView 
      mode={mode} 
      onClose={onClose} 
      isVisible={isVisible} 
      regesterBudget={regesterBudget}
      deleteBudget={deleteBudget}
      editingBudget={editingBudget}
    />
  );
};

export default RegisterBudgetModalContainer;
