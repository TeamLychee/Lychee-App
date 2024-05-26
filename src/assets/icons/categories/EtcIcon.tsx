// 네비게이션 홈아이콘 컴포넌트
import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import IconProps from '../IconProps';

const EtcIcon: React.FC<IconProps> = ({ color }) => {

  return (
    <Svg width="31" height="32" viewBox="0 0 44 45" fill="none">
    <Path d="M41.9767 21.2229C42.0304 20.7845 41.991 20.3396 41.8611 19.9175C41.7312 19.4953 41.5137 19.1053 41.2229 18.7729C40.9285 18.4378 40.5662 18.1693 40.16 17.9852C39.7539 17.801 39.3131 17.7055 38.8671 17.705H5.13286C4.68689 17.7055 4.24614 17.801 3.83996 17.9852C3.43377 18.1693 3.07146 18.4378 2.77711 18.7729C2.48626 19.1053 2.26879 19.4953 2.1389 19.9175C2.009 20.3396 1.9696 20.7845 2.02327 21.2229L4.37902 40.0688C4.4716 40.835 4.84298 41.5402 5.4223 42.05C6.00162 42.5598 6.74834 42.8385 7.52002 42.8329H36.5428C37.3145 42.8385 38.0612 42.5598 38.6405 42.05C39.2198 41.5402 39.5912 40.835 39.6838 40.0688L41.9767 21.2229Z" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M7.86475 17.705V16.1345C7.86475 12.3858 9.35391 8.79062 12.0046 6.13989C14.6554 3.48916 18.2505 2 21.9992 2C25.7479 2 29.3431 3.48916 31.9938 6.13989C34.6445 8.79062 36.1337 12.3858 36.1337 16.1345V17.705" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M15.7173 27.1279V33.4099" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M28.2812 27.1279V33.4099" 
          stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    
    
  );
};

export default EtcIcon;


