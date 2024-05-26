// 네ㅂ;게이션 캘린더 아이콘 컴포넌트
import React from 'react';
import Svg, { Line, Path } from 'react-native-svg';
import IconProps from '../IconProps';

const CalenderIcon: React.FC<IconProps> = ({focused, color}) => {
  return (
    <>
    { focused ? (
      <Svg width="35" height="30" viewBox="0 0 42 42" fill="none">
      <Path d="M7.66667 41C3.98477 41 1 38.3137 1 35V10.4286C1 7.11485 3.98477 4.42855 7.66667 4.42855H34.3333C38.0152 4.42855 41 7.11485 41 10.4286V35C41 38.3137 38.0152 41 34.3333 41H7.66667Z" 
            fill={color}/>
      <Path d="M3.5 14.1428H38.5M8.02381 1V4.42897M33.5 1V4.42855M41 10.4286V35C41 38.3137 38.0152 41 34.3333 41H7.66667C3.98477 41 1 38.3137 1 35V10.4286C1 7.11485 3.98477 4.42855 7.66667 4.42855H34.3333C38.0152 4.42855 41 7.11485 41 10.4286Z" 
            stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <Line x1="2" y1="14.1" x2="40" y2="14.1" 
            stroke="white" stroke-width="2.2"/>
      </Svg>
                
    ) : (
      <Svg width="35" height="30" viewBox="0 0 42 42" fill="none">
      <Path d="M1 14.1428H41M8.02381 1V4.42897M33.5 1V4.42855M41 10.4286V35C41 38.3137 38.0152 41 34.3333 41H7.66667C3.98477 41 1 38.3137 1 35V10.4286C1 7.11485 3.98477 4.42855 7.66667 4.42855H34.3333C38.0152 4.42855 41 7.11485 41 10.4286Z" 
            stroke={color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    )
    }
    </>
  );
};

export default CalenderIcon;









