// PostView.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../common/Colors';
import ThreeDotsIcon from '../../assets/icons/ThreeDotsIcon';
import CommonStyles from '../../common/CommonStyles';
import MateBox from '../../common/MateBox';
import ResidentialIcon from '../../assets/icons/categories/ResidentialIcon';
import FoodIcon from '../../assets/icons/categories/FoodIcon';
import LifestyleIcon from '../../assets/icons/categories/LifestyleIcon';
import EtcIcon from '../../assets/icons/categories/EtcIcon';
import { BudgetProps } from './Types';
import { useAuth } from '../../auth/AuthContext';

interface BudgetViewProps extends BudgetProps{
  openModal: () => void;
  setEditingBudget: (
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
  ) => void;
}

interface CategoryIconProps {
  category: string;
  subCategory: string;
  focused: boolean;
}

const CategoryIconView: React.FC<CategoryIconProps> = ({ category, subCategory, focused }) => {
  
  const CategoryIcon = () => {
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

  return (
    <View style={styles.categoryIconContanier}>
        <View style={styles.categoryShape}> 
          <CategoryIcon />
        <Text style={{marginTop: 5,fontSize: 15, color: Colors.text}}>{subCategory}</Text>
        </View>
    </View>
  )
}

const BudgetView: React.FC<BudgetViewProps> = ({id, userId, userName, userColor, groupId, price, content, category, subCategory, date,isDone, setEditingBudget, openModal}) => {

  const {loggedUser} = useAuth();
  
  const showButton = loggedUser.userId === userId;

  const [isFocused, setIsFocused] = useState(false);

  const isDoneColor = isDone ? '#ccc' : '#fff';

  const isDoneThreeDotsColor = isDone ? '#fff' : Colors.button;

  const handleEdit = () => {
    setEditingBudget( id, price, category, groupId, subCategory, content, date, isDone);
    openModal();
  }

  return(
  <View style={[styles.generalBox, {backgroundColor: isDoneColor}]}>
    {/* 날짜, 버튼 */}
    <View style={styles.dateAndButtonContainer}>
      <View style = {styles.dateContainer}>
        <Text style = {{color: Colors.text, marginLeft: 8, marginTop: 5}}>{date}</Text>
      </View>
        {/* 버튼(threeDots, 수정/삭제) */}
        {showButton && (
          <View style={styles.buttonContainer}>
              <TouchableOpacity
              onPressIn={() => setIsFocused(true)}
              onPressOut={() => setIsFocused(false)}
              onPress={handleEdit}
              style={[styles.buttonContainer, isFocused && styles.focused]}
              >
                  <ThreeDotsIcon color={isDoneThreeDotsColor}/>   
              </TouchableOpacity>
          </View>
        )}
    </View>
     
   
    <View style={{flexDirection:'row'}}>
     {/* left */}
    {/* 카테고리 */}
    <View style={styles.categoryAndContentContainer}>   
      <View style={[styles.contentContainer, {marginLeft: 4}]}>
        <CategoryIconView category={category} subCategory={subCategory} focused={true}/>
      </View>
    </View>
    
    {/* right */}
    <View style={{flex:1, flexDirection: 'column', paddingTop: 10}}>
    {/* 내용 */}
      <View style={{flex:1}}>
      <Text style={{fontSize: 16}}>{content}</Text>
      </View>
    {/* 금액, 작성자 */}
    <View style={styles.priceAndAuthorContainer}>
      <Text style={[styles.priceText, {marginRight: 7}]}>{price}원</Text>
      <MateBox
          userId={userId}
          userColor={userColor}
          userName={userName}
          textSize={12}
      />
    </View>
    </View>
  </View>
  </View>
  );
}

const styles = StyleSheet.create({
  generalBox: {
    backgroundColor: Colors.white,
    marginHorizontal: '5%',
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    ...CommonStyles.shadow,
  },

  dateAndButtonContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  dateContainer : {
    flex: 8,
  },

  categoryAndContentContainer:{
    flexDirection: 'row',
  },

  contentContainer:{
    alignItems: 'flex-start',
  },

  priceAndAuthorContainer : {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  text: {
    fontSize: 16,
    color: '#000000',
  },

  priceText: {
    fontSize: 19,
  },

  buttonContainer: {
    paddingVertical: 12,
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  focused: {
    backgroundColor: 'rgba(181, 181, 181, 0.4)', //포커스 시 배경색
  },

  categoryIconContanier: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 60,
    marginLeft: 5,
  },

  categoryShape:{
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(BudgetView);
function getUser() {
  throw new Error('Function not implemented.');
}

function useEffect(arg0: () => void, arg1: boolean[]) {
  throw new Error('Function not implemented.');
}

