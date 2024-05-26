import { Alert } from 'react-native';
import ApiEndpoints from './ApiEndpoints';
/*
  http 상태코드: response.status
  sucess: 200
  client error: 400
  server error: 500
*/

// GET 요청을 위한 함수
const getData = async <T>(path: string, userToken: string | null): Promise<T> => {
  try {
    const response = await fetch(`${ApiEndpoints.baseURL}${path}`, {
      headers:  
      { 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(path, ': GET fetch HTTP 상태 코드:', response.status);
    if (!response.ok) {
      console.log('GET error:', response.json);
     // throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  } catch (error) {
   // console.error(path, ': fetch Data error', error);
    throw error;
  }
};

// POST 요청을 위한 함수
const postData = async <T, R>(path: string, data: T, userToken: string | null): Promise<R> => {
  try {
    const response = await fetch(`${ApiEndpoints.baseURL}${path}`, {
      method: 'POST',
      headers: 
      { 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(path, ': POST HTTP 상태 코드:', response.status);
    if (!response.ok) {
      console.log('POST error:', response);
      Alert.alert(
        '',
        '오류가 났습니다. 잠시 후 이용해주세요',
        [{ text: '확인' }],
        { cancelable: false }
      );
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<R>;
  } catch (error) {
    console.error(path, ': Error creating data:', error);
    throw error;
  }
};

// DELETE 요청을 위한 함수
const deleteData = async (path: string, userToken: string | null): Promise<void> => {
  try {
    const response = await fetch(`${ApiEndpoints.baseURL}${path}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(path,':DELETE HTTP 상태 코드:', response.status);

  } catch (error) {
    console.error(path, ': Error deleting data:', error);
    throw error;
  }
};

// UPDATE (PATCH) 요청을 위한 함수
const patchData = async <T, R>(path: string, data: T, userToken: string | null): Promise<R> => {
  try {
    const response = await fetch(`${ApiEndpoints.baseURL}${path}`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(path, ':PATCH HTTP 상태 코드:', response.status);
    if (!response.ok) {
      console.log('PATCH error:', response);
      Alert.alert(
        '',
        '오류가 났습니다. 잠시 후 이용해주세요',
        [{ text: '확인' }],
        { cancelable: false }
      );
      throw new Error(`Failed to update: ${response.status}`);
    }
    return await response.json() as R;
  } catch (error) {
    console.error(path, ': Error updating data:', error);
    throw error;
  }
};

// 함수들을 export 합니다.
export { getData, postData, deleteData, patchData };
