import React from 'react';
import { View, Text } from "react-native";
import CommonStyles from "./CommonStyles";

interface PlaceholderMessageProps {
    msg: string;
    fontSize: number;
}

const PlaceholderMessage: React.FC<PlaceholderMessageProps> = ({ msg, fontSize }) => {
    return(
        <View style={[CommonStyles.generalBox, {paddingVertical: 25, paddingHorizontal: 15}]}>
          <Text style={{fontSize: fontSize}}>{msg}</Text>
        </View>
    );
}

export default PlaceholderMessage;