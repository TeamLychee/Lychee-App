// 네비게이션 가계부 아이콘 컴포넌트
import React from 'react';
import Svg, { Line, Path } from 'react-native-svg';
import IconProps from '../IconProps';

const ExpenseIcon: React.FC<IconProps> = ({focused, color}) =>  {
  return (
    <>
    { focused ? (
      <Svg width="33" height="33" viewBox="0 0 46 36" fill="none" >
      <Path d="M38.7494 2H7.25003C4.35046 2 1.99992 4.54364 2 7.68133L2.00056 28.9853C2.00064 32.1229 4.35111 34.6663 7.25054 34.6663L38.75 34.6667C41.6496 34.6667 44.0001 32.1256 44 28.9879L43.9994 7.67911C43.9993 4.54156 41.6488 2 38.7494 2Z" 
            fill={color}/>
      <Path d="M3.3115 11.9417H42.6867M7.25003 2H38.7494C41.6488 2 43.9993 4.54156 43.9994 7.67911L44 28.9879C44.0001 32.1256 41.6496 34.6667 38.75 34.6667L7.25054 34.6663C4.35111 34.6663 2.00064 32.1229 2.00056 28.9853L2 7.68133C1.99992 4.54364 4.35046 2 7.25003 2Z" 
            stroke={color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <Line x1="3" y1="11.9" x2="43" y2="11.9" stroke="white" stroke-width="2.2"/>
      </Svg>
    ) : (
      <Svg width="33" height="33" viewBox="0 0 46 36" fill="none">
      <Path d="M3.3115 11.9417H42.6867M7.25003 2H38.7494C41.6488 2 43.9993 4.54156 43.9994 7.67911L44 28.9879C44.0001 32.1256 41.6496 34.6667 38.75 34.6667L7.25054 34.6663C4.35111 34.6663 2.00064 32.1229 2.00056 28.9853L2 7.68133C1.99992 4.54364 4.35046 2 7.25003 2Z" 
            stroke={color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    )
    }
    </>
  );
};

export default ExpenseIcon;