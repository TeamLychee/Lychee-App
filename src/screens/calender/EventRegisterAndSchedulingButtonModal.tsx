import { Colors } from '../../common/Colors';
import CommonStyles from '../../common/CommonStyles';
import React from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';


interface EditAndDeleteButtonsModalProps {
  isVisible: boolean;
  isScheduling: boolean,
  onClose: () => void;
  openRegisterModal: () => void;
  openSchedulingModal: () => void;
}

const EventRegisterAndSchedulingButtonModal: React.FC<EditAndDeleteButtonsModalProps> = ({ isVisible, isScheduling, onClose, openRegisterModal, openSchedulingModal }) => { 
  const handleCancel = () => {
    onClose();
  };

  const handleRegisterModal = () => {
    onClose();
    openRegisterModal();
  };

  const handleSchedulingModal = () => {
    onClose();
    openSchedulingModal();
  };
  
  return (  
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <TouchableWithoutFeedback 
        onPress={handleCancel}
      >
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.postRegisterAndSchedulingButtoncontainer}>
        <TouchableOpacity 
          style={styles.eventRegisterButton} 
          onPress={handleRegisterModal}
        > 
          <Text style={styles.text}>바로등록</Text>
        </TouchableOpacity>
        { !isScheduling && (
        <TouchableOpacity 
          style={styles.eventSchedulingButton} 
          onPress={handleSchedulingModal}
        >
          <Text style={styles.text}>일정조율</Text>
        </TouchableOpacity>
        )}
      </View> 
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  postRegisterAndSchedulingButtoncontainer:{
    zIndex: 3, // 가장 앞에 위치
    position: 'absolute',
    bottom: '13%',
    right: '10%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...CommonStyles.shadow,
  },

  eventRegisterButton:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    flex: 1,
  },

  eventSchedulingButton:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.text,
  },

  text: {
    fontSize: 15,
    color: '#000000',
  },
});

export default EventRegisterAndSchedulingButtonModal;
