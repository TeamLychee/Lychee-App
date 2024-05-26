import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../../common/Colors';
import SelectCategoryModal from './SelectCategoryModal';
import { BudgetProps } from '../Types';
import ResidentialIcon from '../../../assets/icons/categories/ResidentialIcon';
import FoodIcon from '../../../assets/icons/categories/FoodIcon';
import LifestyleIcon from '../../../assets/icons/categories/LifestyleIcon';
import EtcIcon from '../../../assets/icons/categories/EtcIcon';

interface RegisterBudgetModalViewProps {
  mode: 'create' | 'edit';
  isVisible: boolean;
  editingBudget: BudgetProps|null;
  onClose: () => void;
  regesterBudget: (content: string, price: number, category: string, subCategory: string) => void;
  deleteBudget: () => void;
}

interface CategoryIconProps {
  category: string;
  focused: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, focused }) => {
  switch (category) {
    case '주거':
      return <ResidentialIcon focused={focused} color={Colors.theme}/>;
    case '식비':
      return <FoodIcon focused={focused} color={Colors.theme}/>;
    case '생활':
      return <LifestyleIcon focused={focused} color={Colors.theme}/>;
    case '기타':
      return <EtcIcon focused={focused} color={Colors.theme} />;
    default:
      return null;
  }
};

const RegisterBudgetModalView: React.FC<RegisterBudgetModalViewProps> = ({ mode, isVisible, onClose, regesterBudget, deleteBudget, editingBudget}) => {
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('기타');
  const [subCategory, setSubCategory] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달의 표시 상태를 관리하는 state
  const openModal = () => { setModalVisible(true);}
  const closeModal = () => { setModalVisible(false);}

  const setInitialData = () => {
    if(mode==='edit' && editingBudget) {
      setContent(editingBudget.content);
      setPrice(editingBudget.price);
      setCategory(editingBudget.category);
      setSubCategory(editingBudget.subCategory);
    }
    console.log('editingBudget InitialData: ',editingBudget);
  }

  useEffect(() => {
    setInitialData();
  }, [editingBudget]);

  const handlePriceChange = (inputText: string) => {
    // 입력된 값이 숫자이고, 양수일 때만 state 업데이트
    const parsedNumber = parseInt(inputText, 10);
    if (!isNaN(parsedNumber) && parsedNumber >= 0) {
      setPrice(parsedNumber);
    }
  };

  const handleRegisterBudget = (content: string, price: number, category: string, subCategory: string) => {
    regesterBudget(content, price, category, subCategory);
    handleCancel();
  }

  const handleZeroRegisterBudget = () => {
    regesterBudget('0원 등록', 0, '기타', '기타');
    handleCancel();
  }

  const handleDelete = () => {
    deleteBudget();
    handleCancel();
  }

  const handleCancel = () => {
    onClose();
    setContent('');
    setPrice(0);
    setCategory('기타');
    setSubCategory('기타');
  }

  const handleCategories = (cat: string, subcat: string) => {
    console.log(cat, subcat);
    setCategory(cat);
    setSubCategory(subcat);
  }

  const CategoryView = () => {
    return (
      <View style={styles.categoryIconContanier}>
        <View style={{width: 80, alignItems: 'flex-start', paddingLeft: 5}}>
          <View style={styles.categoryShape}> 
            <CategoryIcon category={category} focused={true} />
          <Text style={{marginTop: 5,fontSize: 15}}>{category}</Text>
          </View>
         </View>
        <Text style={{fontSize: 15}}>{subCategory}</Text>
      </View>
    )
  }

  useEffect(() => {
  }, [category, subCategory]); 

  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.title}>
            <View style={{flex: 1}}>
              <Text style={styles.titleText}>지출내역 등록</Text>
            </View>
            <TouchableOpacity 
                onPress={handleZeroRegisterBudget}
                style={[styles.buttonShape, {marginBottom: 5, backgroundColor: Colors.theme}]}
              >
            <Text style={[styles.buttonText, {color: '#ffffff'}]}>0원 등록</Text>
          </TouchableOpacity>
          </View>
          
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>지출명</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="제목을 입력하세요"
              value={content}
              onChangeText={setContent}
              placeholderTextColor={Colors.text}
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>가격</Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={price.toString()}
              keyboardType="numeric"
              placeholder="숫자로 입력하세요"
              onChangeText={handlePriceChange}
              placeholderTextColor={Colors.text}
            />
          </View>

          {/* 카테고리  */}
          <View style={[styles.itemContainer, {marginTop: 10}]}>
            <Text style={[styles.itemText, {marginBottom: 5}]}>카테고리</Text>
          </View>
            <TouchableOpacity
              onPress={openModal}
            >
             <CategoryView />
            </TouchableOpacity>
        
          <View style={styles.buttonsContainer}>
            <View style={[styles.buttonContainer, {justifyContent: 'flex-start'}]}>
              {mode == 'edit' && (
                <TouchableOpacity 
                  style={[styles.buttonShape, {backgroundColor: 'red'}]}
                  onPress={handleDelete}
                >
                  <Text style={[styles.buttonText, {color: '#ffffff'}]}>삭제</Text>
                </TouchableOpacity>)
              }
            </View>
            <View style={[styles.buttonContainer,{justifyContent: 'flex-end'}]}>
              <TouchableOpacity 
                onPress={handleCancel}
                style={[styles.buttonShape, {marginRight: 5}]}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>handleRegisterBudget(content, price, category, subCategory)}
                style={[styles.buttonShape, {backgroundColor: Colors.theme}]}
              >
                <Text style={[styles.buttonText, {color: '#ffffff'}]}>등록</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SelectCategoryModal isVisible={modalVisible} onClose={closeModal} handleCategories={handleCategories}/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 10,
    borderRadius: 10,
    width: '80%',
    minHeight: 360,
  },

  title : {
    flexDirection: 'row', 
    borderBottomColor: Colors.text, 
    borderBottomWidth: 1, 
    marginBottom: 10,
    alignItems: 'center',
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  itemContainer: {
    marginVertical: 5,
  },

  textInputContainer: {
    marginTop: 5,
    marginBottom: 10,
  },

  textInput: {
    borderRadius: 6,
    backgroundColor: Colors.textInputField,
    height: 25,
    paddingHorizontal: 5,
  },

  itemText: {
    fontSize: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  buttonShape: {
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
  },
  categoryIconContanier: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryShape:{
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterBudgetModalView;
