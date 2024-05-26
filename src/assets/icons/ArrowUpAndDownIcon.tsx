// 네ㅂ;게이션 캘린더 아이콘 컴포넌트
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from './IconProps';

const ArrowUpAndDownIcon: React.FC<IconProps> = ({focused, color}) => {
  return (
    <>
    { focused ? (
          <Svg width="10" height="30" viewBox="0 0 88 75" fill="none">
          <Path d="M44 0L87.3013 75H0.69873L44 0Z" 
                fill={color}/>
          </Svg>               
    ) : (
        <Svg width="10" height="30" viewBox="0 0 88 76" fill="none">
        <Path d="M44.6358 75.3164L0.857791 0.593704L87.4586 0.0422239L44.6358 75.3164Z"
              fill={color}/>
        </Svg>
    )
    }
    </>
  );
};

export default ArrowUpAndDownIcon;









