import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, RefreshControl, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Colors } from '../../common/Colors';
import CommonStyles from '../../common/CommonStyles'
import MagnifyingGlassIcon from '../../assets/icons/MagnifyingGlassIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import RoundPlusButtonView from '../../common/RoundPlusButtonView';
import BudgetView from './BudgetView';
import PlaceholderMessage from '../../common/PlaceholderMessage';
import { BudgetProps, MateSpendingProps, modeType } from './Types';
import CurrentExpenseView from './adjusted/CurrentExpenseView';
import CategoryButtonView from './register/CategoryButtonView';
import RegisterBudgetModalContainer from './register/RegisterBudgetModalContainer';
import { useAuth } from '../../auth/AuthContext';
interface ExpenseViewProps {
  budgets: BudgetProps[];
  getBudgets: () => void;
  getCurrentExpenseData: () => void;
  refreshing: boolean
  onRefresh: () => void;
  currentRefreshing: boolean;
  onRefreshCurrent: () => void;
  groupSum: number,
  groupAvg: number,
  mateSpendings: MateSpendingProps[];
  isCalculating: boolean
}

const ExpenseView:React.FC<ExpenseViewProps> = ({isCalculating, budgets, getBudgets, groupSum, groupAvg, mateSpendings, getCurrentExpenseData, refreshing, onRefresh, currentRefreshing, onRefreshCurrent }) => {
  const [roundBoxHeight, setRoundBoxHeight] = useState<number>(0);
  
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달의 표시 상태를 관리하는 state
  
  const [modalMode, setModalMode] = useState<modeType>('create');
  const [editingBudget, setEditingBudget] = useState<BudgetProps|null>(null);
  const [searchFieldVisivble, setSearchFieldVisible] = useState<boolean>(false); 

  const [searchKeyword, setSearchKeyword] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredData = budgets && budgets.filter((item: BudgetProps) =>
    item.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item.userName?.toLowerCase().includes(searchKeyword.toLowerCase()) || 
    item.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item.subCategory.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleSearchFieldVisible = () => {
    setSearchFieldVisible(current => !current);
    setSearchKeyword('');
    setSelectedCategory('');
  }
  
  const openModal = (mode: modeType) => {
    setModalMode(mode)
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
    setEditingBudget(null);
  }

  // 버튼 함수
  const handleCategoryPress = (title: string) => {
    setSearchFieldVisible(false);
    if(selectedCategory===title) {
      setSearchKeyword('');
      setSelectedCategory('');
    } else {
      setSearchKeyword(title);
      setSelectedCategory(title);
    }
  };

  const handleEditingBudget = (
    id: number,
    price: number,
    category: string,
    groupId: string,
    subCategory: string,
    content: string,
    date: string,
    isDone: boolean,
    userId?: string,
    userName?: string,
    userColor?: string,
  ) => {
      const editingBudget: BudgetProps = {
        id: id,
        price: price,
        category: category,
        groupId: groupId,
        subCategory: subCategory,
        content: content,
        date: date,
        isDone: isDone,
      }
      setEditingBudget(editingBudget);
  }

  useEffect(() => {
  }, [roundBoxHeight]); // roundBoxHeight가 변경될 때마다 실행됨

  useEffect(() => {
    console.log("roundBoxHeight: ", roundBoxHeight);
  }, [roundBoxHeight]);

  //공과금 utilities 식비 food 비품 supplies 기타 others
  return (
    <View style={CommonStyles.baseContainer}>
      <SafeAreaView style={[CommonStyles.safearea]}>
      {/* 현재 지출 현황 */}           
      <View style={[CommonStyles.section]}>
        <Text style={[styles.title, { color: 'white'}]}>현재 지출 현황</Text>
        <ScrollView
         refreshControl={
          <RefreshControl
            refreshing={currentRefreshing}
            onRefresh={onRefreshCurrent}
          />
        }
        >
        { isCalculating ? (
          <CurrentExpenseView 
            groupSum={groupSum} 
            groupAvg={groupAvg} 
            mateSpendings={mateSpendings} 
            getCurrentExpenseData={getCurrentExpenseData}
          /> ) : (
            <PlaceholderMessage msg={'미정산내역이 없습니다.'} fontSize={18} />
          )
        }
        </ScrollView>
      </View>

      {/* 지출 카테고리 및 검색*/}
      <View 
        style={[CommonStyles.section]}
        onLayout={(event) => {
          const { y } = event.nativeEvent.layout;
          console.log('y:', y);
          const calculatedHeight = y * 4 / 5;
          setRoundBoxHeight(calculatedHeight);
        }}
        >
        
        <View style={{flexDirection: 'row', marginHorizontal: '5%'}}>
          <View style={[styles.categories, {flex: 1}]}>
            <CategoryButtonView name="주거" selectedCategory={selectedCategory} onPress={() => handleCategoryPress("주거")} />
            <CategoryButtonView name="식비" selectedCategory={selectedCategory} onPress={() => handleCategoryPress("식비")}  />
            <CategoryButtonView name="생활" selectedCategory={selectedCategory} onPress={() => handleCategoryPress("생활")} />
            <CategoryButtonView name="기타" selectedCategory={selectedCategory} onPress={() => handleCategoryPress("기타")} />
          </View>
          <View style={{width: 30, justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={handleSearchFieldVisible}>
              <MagnifyingGlassIcon />
            </TouchableOpacity>
          </View>
        </View>
        
        { searchFieldVisivble && (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.searchContainer]}>
           <TextInput
            placeholder="제목, 지출자, 카테고리, 서브카테고리로 검색해보세요"
            value={searchKeyword}
            onChangeText={text => setSearchKeyword(text)}
            />
          </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {/* 지출 내역 리스트 */}
      <View style={[CommonStyles.section, {marginBottom: 220}]}>
        { filteredData && filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BudgetView
              id={item.id}
              price={item.price}
              content={item.content}
              category={item.category}
              userId={item.userId}
              userColor={item.userColor}
              userName={item.userName}
              date={item.date} 
              isDone={item.isDone}
              groupId={item.groupId} 
              subCategory={item.subCategory}  
              openModal={()=>openModal('edit')}
              setEditingBudget={handleEditingBudget}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
        ) : (
          <PlaceholderMessage msg='등록된 지출이 없습니다.' fontSize={18} />
        )
      }
      </View>
      {/* roundBox */}
      <View style={[styles.roundBox, {height: roundBoxHeight}]}></View> 
      </SafeAreaView>

      {/* round plus button */}
      <View style={{alignItems: 'flex-end', paddingHorizontal: '4%'}}>
      <TouchableOpacity onPress={()=>openModal('create')} style={{width: 50}}>
        <RoundPlusButtonView />
      </TouchableOpacity>
      </View>
      <RegisterBudgetModalContainer mode={modalMode} isVisible={modalVisible} onClose={closeModal} getBudgets={getBudgets} editingBudget={editingBudget}/>
    </View>
  );
}

const styles = StyleSheet.create({
  roundBox: {
    zIndex: 1, // 낮은 zIndex로 뒤에 위치
    backgroundColor: Colors.theme,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: 'absolute',
    width: '100%', // 너비 
  },

  title:{
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    marginVertical: 15,
    marginHorizontal: '5%',
  },

  currentExpenses: {
    backgroundColor: Colors.white,
    marginBottom: 10,
    marginHorizontal: '5%',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'flex-start',
    ...CommonStyles.shadow,
  },

  searchContainer : {
    flexDirection: 'row',  // 가로 방향으로 정렬
    marginHorizontal: '5%',
    justifyContent: 'flex-start',
    backgroundColor: Colors.textInputField,
    borderRadius: 7,
    paddingVertical: 5,
    marginBottom: 5,
  },

  categories: {
    marginBottom: 3,
    alignItems: 'flex-start',
    flexDirection: 'row',  // 가로 방향으로 정렬
  },

  expenseItem: {
    backgroundColor: Colors.white,
    marginHorizontal: '5%',
    marginBottom:20, 
    borderRadius: 12,
    padding: 10,
    ...CommonStyles.shadow,
  },

  text: {
    fontSize: 18,
    alignItems: 'flex-start',
  },
});

export default ExpenseView;
