// TodosContainer.tsx
import PlaceholderMessage from '../../../common/PlaceholderMessage';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Colors } from '../../../common/Colors';
import CommonStyles from '../../../common/CommonStyles';
import ArrowUpAndDownIcon from '../../../assets/icons/ArrowUpAndDownIcon';
import TodoView, { TodoProps } from './TodoView';
import { getData } from '../../../api/APIs';
import { ServerTodo } from '../../../api/ServerInterfaces';
import { useAuth } from '../../../auth/AuthContext';

const TodosContainer = () => {
  const { userToken } = useAuth();
  const [thisWeekTodoList, setThisWeekTodoList] = useState<TodoProps[]>([]);
  const [boxMaxHeight, setBoxMaxHeight] = useState<number | null>(130);
  const [boxMaxHeightButtonFocused, setBoxMaxHeightButtonFocused] = useState<boolean>(false);
  const [boxMaxHeightButtonColor, setBoxMaxHeightButtonColor] = useState<string>(Colors.button);
  const [todoCount, setTodoCount] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);

  const toggleBoxHeight = () => {
    setBoxMaxHeight(boxMaxHeightButtonFocused ? 130 : 630);
    setBoxMaxHeightButtonFocused(boxMaxHeightButtonFocused ? false: true)
    setBoxMaxHeightButtonColor(boxMaxHeightButtonFocused ? Colors.button : Colors.theme)
  };

  const getTodos = async () => {
    try {
      const path = '/calendar/get/week';
      const serverData = await getData<{
        code: number,
        message: string,
        data: ServerTodo[]
      }
      >(path, userToken);

      console.log('server todos', serverData);
      
      // 서버 데이터를 클라이언트의 데이터 구조로 변환
      const data = serverData.data.map((item: any) => ({
        id: item.id,
        content: item.title,
        groupId: item.groupId,
        weekDays: item.daysOfWeek.join(''),
        participants: item.participants,
      }));
      
      console.log('todos', data);

      setThisWeekTodoList(data);
      setTodoCount(data.length);
      
    } catch (error) {
      // data가 빈 배열일 경우, 빈 배열 setting
      console.error('Failed to fetch todolist:', error);
      setThisWeekTodoList([]);
      setTodoCount(0);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    getTodos(); // 데이터를 다시 가져옴
    setRefreshing(false); // 새로고침 완료 후 refreshing 상태 변경
  };

  useEffect(() => {
    getTodos();
  }, []); 

    return (
      <View>
        <Text style={[styles.title, { color: 'white'}]}> 이번주 할 일 ({todoCount})</Text>
        {thisWeekTodoList.length > 0 ? (
          <View style={[styles.generalBox, {maxHeight: boxMaxHeight}]}>
            <FlatList
              data={thisWeekTodoList}
              keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
              renderItem={({ item }) => (
                <TodoView
                  id={item.id}
                  content={item.content}
                  weekDays={item.weekDays}
                  participants={item.participants}        
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />  
            <TouchableOpacity 
              style={{alignItems: 'flex-start', marginLeft: 12}} 
              onPress={toggleBoxHeight}
            >
              <ArrowUpAndDownIcon focused={boxMaxHeightButtonFocused} color={boxMaxHeightButtonColor}/>      
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            <PlaceholderMessage msg='이번주 할 일이 없습니다.' fontSize={18} />
          </ScrollView>
        )}
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

  arrowUpIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent', //투명
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.button,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  arrowDownIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '180deg' }],
    marginRight: 10,
    alignItems: 'flex-end',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    marginVertical: 15,
    marginHorizontal: '5%',
  },
})

export default TodosContainer;