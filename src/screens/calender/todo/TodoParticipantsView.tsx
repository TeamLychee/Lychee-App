// TodoParticipantsView.tsx
import React from 'react';
import { View } from 'react-native';
import MateBox from '../../../common/MateBox';
import { UserProps } from '../../mypage/types';

interface TodoParticipantsProps {
    participants: UserProps[]
}

const TodoParticipantsView: React.FC<TodoParticipantsProps> = ({participants}) => {
    return(
        <View 
            style={{
                display: 'flex', 
                flexWrap: 'wrap', 
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            {participants.map((participant, index) => (
            <MateBox
                key={index.toString()}
                userName={participant.userName}
                userColor={participant.userColor}
                textSize={10}
                showOnlyFirstLetter={true}
                marginRight={3}
            />
            ))}
        </View>
    )
}

export default TodoParticipantsView;