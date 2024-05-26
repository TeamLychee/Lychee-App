import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, RefreshControl } from 'react-native';
import PlaceholderMessage from '../../common/PlaceholderMessage';
import CommonStyles from '../../common/CommonStyles';
import { getData } from '../../api/APIs';
import { useAuth } from '../../auth/AuthContext';
import { Colors } from '../../common/Colors';

interface NoticificationProps {
  id: number;
  content: string;
  date: string;
}

const NoticificationView: React.FC<NoticificationProps> = ({content, date}) => {
  return (
    <View style={CommonStyles.generalBox}>
      <Text style={{fontSize: 15, marginBottom: 5}}>{content}</Text>
      <Text style={{fontSize: 12, color: Colors.text}}>{date}</Text>
    </View>
  )
}

const NormalNoticificationsContainer: React.FC = () => {
  const {userToken} = useAuth();
  const [noticifications, setNoticifications] = useState<NoticificationProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // API에서 데이터를 가져오는 함수
  const getNoticifications = async () => {
    try {
      const path = '/notis';
      const response = await getData<{
        'code': number,
        'message': string,
        'data':  {
          Notifications: {
            Id: number;
            text: string;
            createdAt: string;}[];
          } | string;
      }>(path, userToken);

      if(typeof response.data !== 'string'){
          // 서버 데이터를 클라이언트의 데이터 구조로 변환
          const data = response.data.Notifications.map((item: any) => ({
            id: item.Id,
            content: item.text,
            date: item.createdAt.substring(0,10),
          }));
          setNoticifications(data);
        }
        console.log('noticifications sucessed');
    } catch (error) {
         console.error('Failed to fetch NormalNotifications:', error);
      // 기본 동작: 빈 배열로 설정
      setNoticifications([]);
    }
  };

   // 새로고침 동작을 처리하는 함수
   const onRefresh = () => {
    setRefreshing(true);
    getNoticifications(); // 데이터를 다시 가져옴
    setRefreshing(false); // 새로고침 완료 후 refreshing 상태 변경
  };
  
  useEffect(() => {
    getNoticifications();
  }, []);

  return (
    <View>
        {noticifications.length > 0 ? (
          <FlatList
            data={noticifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <NoticificationView
                id={item.id}
                content={item.content}
                date={item.date}        
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
          <PlaceholderMessage msg='알림이 없습니다.' fontSize={18} />
        )}
  </View>
  );
};

export default NormalNoticificationsContainer;
