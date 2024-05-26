// 네비게이션 홈아이콘 컴포넌트
import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import IconProps from '../IconProps';

const LifestyleIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <Svg width="40" height="33" viewBox="0 0 51 44" fill="none">
    <Path d="M38.3636 2L49.2727 12.9091L42 20.1818L38.3636 16.5455V38.3636C38.3636 39.3281 37.9805 40.253 37.2986 40.9349C36.6166 41.6169 35.6917 42 34.7273 42H16.5455C15.581 42 14.6561 41.6169 13.9742 40.9349C13.2922 40.253 12.9091 39.3281 12.9091 38.3636V16.5455L9.27273 20.1818L2 12.9091L12.9091 2H38.3636Z" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    
  );
};

export default LifestyleIcon;


