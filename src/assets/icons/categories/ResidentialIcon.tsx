// 네비게이션 홈아이콘 컴포넌트
import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import IconProps from '../IconProps';

const ResidentialIcon: React.FC<IconProps> = ({ color }) => {

  return (
    <Svg width="30" height="30" viewBox="0 0 44 44" fill="none">
    <Path d="M15.3333 42V26.7841C15.3333 25.3835 16.5272 24.2481 18 24.2481H26C27.4728 24.2481 28.6667 25.3835 28.6667 26.7841V42M20.4546 2.46927L3.12127 14.1912C2.41781 14.6669 2 15.437 2 16.2579V38.196C2 40.2969 3.79086 42 6 42H38C40.2091 42 42 40.2969 42 38.196V16.2579C42 15.437 41.5822 14.6669 40.8787 14.1912L23.5454 2.46927C22.6202 1.84358 21.3798 1.84358 20.4546 2.46927Z" 
          stroke={color} stroke-width="3" stroke-linecap="round"/>
    </Svg>
    
  );
};

export default ResidentialIcon;


