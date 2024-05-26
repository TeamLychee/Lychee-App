// 네비게이션 홈아이콘 컴포넌트
import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import IconProps from '../IconProps';

const FoodIcon: React.FC<IconProps> = ({ color }) => {

  return (
    <Svg width="31" height="35" viewBox="0 0 44 48" fill="none" >
    <Path d="M33.8475 22.2495C38.2656 22.2495 41.8473 17.7725 41.8473 12.2498C41.8473 6.72704 38.2656 2.25 33.8475 2.25C29.4293 2.25 25.8477 6.72704 25.8477 12.2498C25.8477 17.7725 29.4293 22.2495 33.8475 22.2495Z" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M33.8462 22.2495V45.5823" 
          stroke={color}  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M10.1797 2.25V45.5823" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M18.5134 2.25V10.5831C18.5134 11.6775 18.2979 12.7611 17.8791 13.7721C17.4603 14.7831 16.8465 15.7017 16.0727 16.4755C15.2989 17.2493 14.3803 17.8632 13.3692 18.2819C12.3582 18.7007 11.2746 18.9163 10.1803 18.9163V18.9163C7.97021 18.9163 5.85065 18.0383 4.28789 16.4755C2.72512 14.9128 1.84717 12.7932 1.84717 10.5831V2.25" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    
  );
};

export default FoodIcon;


