// 네비게이션 마이페이지 아이콘 컴포넌트
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../IconProps';

const MypageIcon: React.FC<IconProps> = ({focused, color}) => {
  return (
    <>
    { focused ? (
      <Svg width="30" height="30" viewBox="0 0 40 42" fill="none" >
      <Path d="M2 37.8475C2 30.3751 7.91429 24.3175 20 24.3175C32.0857 24.3175 38 30.3751 38 37.8475C38 39.0363 37.1783 40 36.1647 40H3.83529C2.82169 40 2 39.0363 2 37.8475Z" 
            fill={color}/>
      <Path d="M26.75 9.125C26.75 13.06 23.7279 16.25 20 16.25C16.2721 16.25 13.25 13.06 13.25 9.125C13.25 5.18997 16.2721 2 20 2C23.7279 2 26.75 5.18997 26.75 9.125Z" 
            fill={color}/>
      <Path d="M2 37.8475C2 30.3751 7.91429 24.3175 20 24.3175C32.0857 24.3175 38 30.3751 38 37.8475C38 39.0363 37.1783 40 36.1647 40H3.83529C2.82169 40 2 39.0363 2 37.8475Z" 
              stroke={color} stroke-width="2.2"/>
      <Path d="M26.75 9.125C26.75 13.06 23.7279 16.25 20 16.25C16.2721 16.25 13.25 13.06 13.25 9.125C13.25 5.18997 16.2721 2 20 2C23.7279 2 26.75 5.18997 26.75 9.125Z" 
              stroke={color} stroke-width="2.2"/>
      </Svg>
    ) : (
      <Svg width="30" height="30" viewBox="0 0 40 42" fill="none">
      <Path d="M2 37.8475C2 30.3751 7.91429 24.3175 20 24.3175C32.0857 24.3175 38 30.3751 38 37.8475C38 39.0363 37.1783 40 36.1647 40H3.83529C2.82169 40 2 39.0363 2 37.8475Z" 
            stroke={color} stroke-width="2.2"/>
      <Path d="M26.75 9.125C26.75 13.06 23.7279 16.25 20 16.25C16.2721 16.25 13.25 13.06 13.25 9.125C13.25 5.18997 16.2721 2 20 2C23.7279 2 26.75 5.18997 26.75 9.125Z" 
            stroke={color} stroke-width="2.2"/>
      </Svg>
    )
    }
    </>
  );
};

export default MypageIcon;