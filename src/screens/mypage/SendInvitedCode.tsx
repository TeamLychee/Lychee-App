// KeepInvitedCode.tsx
import React from 'react';
import { TouchableOpacity, Text, Alert} from 'react-native';
//import Clipboard from '@react-native-clipboard/clipboard';
interface SendInvitedCodeProps {
  groupCode: string;
}

const SendInvitedCode: React.FC<SendInvitedCodeProps> = ({ groupCode }) => {
  const copyToClipboard = () => {
  //  Clipboard.setString(groupCode);
    Alert.alert('초대코드가 클립보드에 복사되었습니다. 복사된 초대코드를 다른 사람에게 보내보세요');
    console.log('Copy to Clipboard');
  };

  return (
    <TouchableOpacity 
     // onPress={copyToClipboard} 
    >
      <Text>초대코드 보내기</Text>
    </TouchableOpacity>
  );
};

export default SendInvitedCode;