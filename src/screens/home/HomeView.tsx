import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, RefreshControl,} from 'react-native';
import { Colors } from '../../common/Colors';
import CommonStyles from '../../common/CommonStyles';
import RoundPlusButtonView from '../../common/RoundPlusButtonView';
import PostView, { PostProps } from './PostView';
import PlaceholderMessage from '../../common/PlaceholderMessage';
import RegisterPostModalContainer from './register/RegisterPostModalContainer';
import TodosContainer from '../calender/todo/TodosContainer';
import MagnifyingGlassIcon from '../../assets/icons/MagnifyingGlassIcon';
import { useAuth } from '../../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface HomeViewProps {
  posts: PostProps[];
  getPosts: () => void; 
  editPin: (id: number, isPinned: boolean) => void;
  refreshing: boolean
  onRefresh: () => void;
}

const HomeView:React.FC<HomeViewProps> = ({posts, getPosts, editPin, refreshing, onRefresh}) => {
  console.log('HomeView posts:', posts);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달의 표시 상태를 관리하는 state
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingPostId, setEditingPostId] = useState<number>(-1);
  const [editingPostContent, setEditingPostContent] = useState<string>('');
  const [searchFieldVisivble, setSearchFieldVisible] = useState<boolean>(false); 
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredData = posts && posts.filter((item: PostProps) =>
    item.content.includes(searchKeyword) ||
    item.userName?.includes(searchKeyword)
  );

  const handleSearchFieldVisible = () => {
    setSearchFieldVisible(current => !current);
    setSearchKeyword('');
  }

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
    setEditingPostId(-1);
    setEditingPostContent('');
  }
  
  const toggleModalMode = (mode: 'create' | 'edit') => {
    if(mode==='create') setModalMode('create');
    else setModalMode('edit');
  }

  const [roundBoxHeight, setRoundBoxHeight] = useState<number>(0);

  //round box 길이 변경 함수
  useEffect(() => {
  }, [roundBoxHeight]); // roundBoxHeight가 변경될 때마다 실행됨
  

  return (
    <View style={CommonStyles.baseContainer}>
      <SafeAreaView style={CommonStyles.safearea}>

      {/* 피드 */}
      <View 
        style={[CommonStyles.section, {minHeight: 600}]}
        onLayout={(event) => {
          const { y } = event.nativeEvent.layout;
          const calculatedHeight = y * 4 / 5;
          setRoundBoxHeight(calculatedHeight);
        }}
      >
        <View style={{flexDirection: 'row', marginHorizontal: '5%'}}>
          <View style={{flex: 1}}>
            <Text style={[styles.title, { color: 'black' }]}>피드</Text>
          </View>
          <View style={{width: 30, justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={handleSearchFieldVisible}>
              <MagnifyingGlassIcon />
            </TouchableOpacity>
          </View>
        </View>
        { searchFieldVisivble && (
          <View style={styles.searchContainer}>
           <TextInput
            placeholder="제목, 작성자로 검색해보세요"
            value={searchKeyword}
            onChangeText={text => setSearchKeyword(text)}
            />
          </View>
        )}

        <View style={{marginBottom: 350}}>
          { filteredData && filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <PostView
                  id={item.id}
                  content={item.content}
                  isPinned={item.isPinned}
                  userId={item.userId}
                  userName={item.userName}
                  userColor={item.userColor}
                  date={item.date} 
                  groupId={item.groupId} 
                  openModal={() => openModal()}
                  setModalMode={()=> toggleModalMode('edit')}
                  setEditingPostId={() => setEditingPostId(item.id)}
                  setEditingPostContent={() => setEditingPostContent(item.content)}
                  editPin={() => editPin(item.id, item.isPinned)}
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
            <PlaceholderMessage msg='등록된 게시물이 없습니다.' fontSize={18} />
          )}
          </View>
      </View>

      {/* roundBox */}
      <View style={[styles.roundBox, {height: roundBoxHeight}]}></View>
      </SafeAreaView>

      {/* round plus button */}
      <View style={{alignItems: 'flex-end', paddingHorizontal: '4%'}}>
      <TouchableOpacity 
          onPress={() => {
            setEditingPostId(-1);
            toggleModalMode('create');
            openModal();
          }} 
          style={{width: 50}}>
        <RoundPlusButtonView />
      </TouchableOpacity>
      </View>
      <RegisterPostModalContainer mode={modalMode} isVisible={modalVisible} id={editingPostId} postContent={editingPostContent} onClose={()=>closeModal()} getPosts={getPosts}/>
    </View>
  );
}

const styles = StyleSheet.create({
  roundBox: {
    zIndex: 1, // 낮은 zIndex로 맨 뒤에 위치
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

  searchContainer : {
    flexDirection: 'row',  // 가로 방향으로 정렬
    marginHorizontal: '5%',
    justifyContent: 'flex-start',
    backgroundColor: Colors.textInputField,
    borderRadius: 7,
    paddingVertical: 5,
    marginBottom: 5,
  },
});

export default HomeView;
