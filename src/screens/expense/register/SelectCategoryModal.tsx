import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView } from 'react-native';
import { Colors } from '../../../common/Colors';
import { useAuth } from '../../../auth/AuthContext';
import { deleteData, getData, postData } from '../../../api/APIs';
import { CategoryProps } from '../Types';


interface SelectCategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  handleCategories: (cat: string, subcat: string) => void;
}

type modeType = 'select' | 'edit' | 'post' ;

const categoryNames: CategoryProps[] = [ {name: '주거'} , {name: '식비'}, {name: '생활'}, {name: '기타'}];

interface subCategoryProps {
  parent: string,
  name: string,
}

const SelectCategoryModal: React.FC<SelectCategoryModalProps> = ({ isVisible, onClose, handleCategories}) => {
  
  const { userToken } = useAuth();

  const [mode, setMode] = useState<modeType>('select');
  const [selectedCategory, setSelectedCategory] = useState<string>('기타');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [subCategories, setSubCategories] = useState<subCategoryProps[]>([]);
  const [newSubCategory, setNewSubCategory] = useState<string>('');
  
  const getSubCategories = async () => {
    console.log('getSubCategories mode:', mode);
    if(mode!='post'){
      try {
        const path = '/budget/subcat/'+selectedCategory;
        const serverData = await getData<{
          name: string
        }[]>(path, userToken);
        const data = serverData.map((item) => ({
          parent : selectedCategory,
          name : item.name
        }));
        setSubCategories(data);
        console.log(selectedCategory, 'SubCategories:',data);
      } catch (error) {
        // data가 빈 배열일 경우, 빈 배열 setting
        console.error('Failed /budget/subcat:', error);
      }
    }
  }

  const postSubCategory = async (parent: string, name: string) => {
    // JSON 데이터 생성
    const newSub = {
      name: name,
    };
    console.log('newSubCategory will be sended: ', newSub);
    try {
      const path = '/budget/subcat/'+parent;
      const response = await postData<typeof newSub, any>(path, newSub, userToken);
      console.log('newSubCategory 추가:', response);
    } catch (error) {
      console.error('newSubCategory 서버 요청 실패:', error);
    }
  };

  const deleteSubCategory = async (parent: string, subCategoryName: string) => {
    try {
      const path = '/budget/subcat/'+parent+'/'+subCategoryName;
      await deleteData(path, userToken);
      console.log('삭제 완료');
    } catch (error) {
      console.error('서브 카테고리 삭제 실패:', error);
    }
  };

  const CategoryButton: React.FC<CategoryProps> = ({name}) => {
    return (
      <TouchableOpacity 
        style={[styles.buttonShape, 
          selectedCategory===name ? {backgroundColor: Colors.theme} : {backgroundColor: Colors.textInputField},
          {marginHorizontal: 6}
        ]}
        onPress={()=>setSelectedCategory(name)}
      >
        <Text 
          style={[styles.buttonText, 
            selectedCategory===name ? {color: '#fff'}:{color: '#000'}]}
        >{name}</Text>
      </TouchableOpacity>
    );
  };

  const SubCategoryButton: React.FC<subCategoryProps> = ({parent, name}) => {
    return (
      <View>
      {/* 삭제 버튼 */}
      { mode === 'edit' && ( <TouchableOpacity 
        style={{backgroundColor: 'red', borderRadius: 100, width: 20, height:20, position: 'absolute', zIndex: 2, alignItems: 'center', right: 0}}
      >
        <Text 
          style={{color: '#fff'}}
          onPress={() => handleDeleteSubCategory(parent, name)}
        >x</Text>
      </TouchableOpacity>
      )}
      {/* 선택 */}
      <TouchableOpacity 
        style={[styles.buttonShape, 
          selectedCategory == parent && selectedSubCategory===name ? {backgroundColor: Colors.theme} : {backgroundColor: Colors.textInputField},
          {marginHorizontal: 6, marginTop: 4}
        ]}
        onPress={ mode === 'select' ? (()=>setSelectedSubCategory(name)): undefined}
      >
        <Text 
          style={[styles.buttonText, 
            selectedCategory == parent && selectedSubCategory===name ? {color: '#fff'}:{color: '#000'}]}
        >{name}</Text>
      </TouchableOpacity>
      </View>
    );
  };


  const handleResigster = () => {
    handleCategories(selectedCategory, selectedSubCategory);
    onClose();
  }

  const handleEdit = () => {
    setMode('edit');
    setSelectedCategory('기타');
  }

  const handleSelect = () => {
    setMode('select');
  }

  const handleResigsterSubCategory = (parent: string, name: string) => {
    postSubCategory(parent, name);
    setSelectedCategory(parent);
    setMode('edit');
    setNewSubCategory('');
  }

  const handleDeleteSubCategory = (parent: string, name: string) => {
    deleteSubCategory(parent, name);
    setSelectedCategory(parent);
    setMode('select');
    setNewSubCategory('');
  }

  useEffect(() => {
    getSubCategories();
  }, [selectedCategory]); 

  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
           {/* 모드 & 제목 */}
          <View style={{borderBottomColor: Colors.text, flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
            <View style={{flex: 1}}>
              <Text style={styles.titleText}> 
              {
                mode == 'select' ? '카테고리 선택' : mode=='edit' ? '카테고리 삭제' : '카테고리 추가'
              }
              </Text>
            </View>
          { mode=='select' ? (
            <View style={[{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 10}]}>
              <TouchableOpacity 
                style={{marginRight: 7}}
                onPress={handleEdit}
              >
                <Text style={styles.buttonText}>편집</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 10}]}>
              <TouchableOpacity 
                style={{marginRight: 7}}
                onPress={handleSelect}
              >
                <Text style={styles.buttonText}>선택</Text>
              </TouchableOpacity>
              { mode=='edit' ? (
              <TouchableOpacity 
                onPress={()=>setMode('post')}
              >
                <Text style={styles.buttonText}>추가</Text>
              </TouchableOpacity>
              ) : (
              <TouchableOpacity 
                onPress={()=>setMode('edit')}
              >
                <Text style={styles.buttonText}>삭제</Text>
              </TouchableOpacity>
              )}
            </View>
          )}
          </View>        
          
          {/* 카테고리  */}
          <View style={styles.categoriesContainer}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            {categoryNames.map((item, index) => (
                <CategoryButton key={index.toString()} name={item.name} />
            ))}
            </View>
          </View>

          {/* 서브 카테고리  필드 */}
        { mode != 'post' ? (
            <ScrollView>
              <View style={styles.subCategoriesContainer}>
                {subCategories.map((item, index) => (
                  <SubCategoryButton 
                    key={index.toString()} 
                    parent={item.parent}
                    name={item.name} 
                  />
                ))}
              </View> 
            </ScrollView>
          )  :  ( 
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="새로운 서브 카테고리를 입력해주세요"
                onChangeText={setNewSubCategory}
                placeholderTextColor={Colors.text}
              />
            </View>
          )
        }

        {/* 등록 버튼 */}
        {mode === 'select' && (
          <TouchableOpacity 
            onPress={handleResigster} 
            style={[styles.buttonShape, {backgroundColor: Colors.theme, alignItems: 'center', paddingVertical: 7, marginTop: 10}]}
          >
            <Text style={[styles.buttonText, {color: '#ffffff'}]}>등록</Text>
          </TouchableOpacity>
        )}

        {/* 추가 버튼 */}
        {mode === 'post' && (
          <TouchableOpacity 
            onPress={() => handleResigsterSubCategory(selectedCategory, newSubCategory)} 
            style={[styles.buttonShape, {backgroundColor: Colors.theme, alignItems: 'center', paddingVertical: 7, marginTop: 10}]}
          >
            <Text style={[styles.buttonText, {color: '#ffffff'}]}>추가</Text>
          </TouchableOpacity>
        )}

        </View>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 10,
    borderRadius: 10,
    width: '80%',
    minHeight: 360,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 7,
  },

  itemContainer: {
    marginVertical: 5,
  },

  textInputContainer: {
    marginVertical: 20,
    flex: 1,
  },

  textInput: {
    borderRadius: 6,
    backgroundColor: Colors.textInputField,
    height: 50,
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

  categoriesContainer: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.background,
  },

  subCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
});

export default SelectCategoryModal;
