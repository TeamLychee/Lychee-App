// PostView.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../common/Colors';
import PinIcon from '../../assets/icons/PinIcon';
import ThreeDotsIcon from '../../assets/icons/ThreeDotsIcon';
import CommonStyles from '../../common/CommonStyles';
import MateBox from '../../common/MateBox';
import { useAuth } from '../../auth/AuthContext';

export interface PostProps {
  id: number;
  content: string;
  isPinned: boolean;
  userId?: string;
  userColor?: string;
  userName?: string;
  groupId: string;
  date: string;
}

interface PostViewProps extends PostProps{
  openModal: () => void;
  setModalMode: (mode: 'create' | 'edit') => void;
  setEditingPostId: (id: string) => void;
  setEditingPostContent: (content: string) => void;
  editPin: (id: number, isPinned: boolean) => void;
}

const PostView: React.FC<PostViewProps> = ({ id, content, isPinned, userId, date, userColor, userName, openModal, setModalMode, setEditingPostId, setEditingPostContent, editPin}) => {
  // userId가 현재 로그인한 사용자의 userId와 일치하면 버튼을 표시하고 아니면 감춥니다.
  const { loggedUser } = useAuth();
  
  const showButton = loggedUser.userId === userId;

  const [isFocused, setIsFocused] = useState(false);

  const handleEdit = () => {
    setEditingPostId(id.toString());
    setEditingPostContent(content);
    setModalMode('edit');
    openModal();
  }

  return(
  <View style={styles.generalBox}>
    <View style={styles.contentAndButtonContainer}>
      <View style={[styles.contentContainer, {marginLeft: 4}]}>
        <Text style={styles.text}>{content}</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        {showButton && (
        <TouchableOpacity
          onPressIn={() => setIsFocused(true)}
          onPressOut={() => setIsFocused(false)}
          onPress={handleEdit}
          style={[styles.buttonContainer, isFocused && styles.focused]}
        >
          <ThreeDotsIcon color={Colors.button}/>
        </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          onPress={() => editPin(id, isPinned)}
        >
          <PinIcon 
            color={isPinned ? Colors.theme : Colors.button} 
          />
        </TouchableOpacity>
      </View>
    </View>
    
    <View style={styles.authorAndDateContainer}>
      <View style={styles.dateContainer}>
        <Text style = {{color: Colors.text}}> {date}</Text>
      </View>
      <MateBox
          userId={userId}
          textSize={12}
          showOnlyFirstLetter={false} 
          userName={userName} 
          userColor={userColor}     
      />
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
    padding: 10,
    ...CommonStyles.shadow,
  },

  contentAndButtonContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  contentContainer:{
    alignItems: 'flex-start',
    marginVertical: 1,
    flex: 8,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  authorAndDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateContainer : {
    flex: 8,
  },

  text: {
    fontSize: 16,
    color: '#000000',
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

});

export default PostView;


