import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = () => {
  return (
    <Svg height="30" width="30" viewBox="0 0 30 30">
    <Path
      d="M15 0v30M0 15h30"
      stroke="#ffffff"
      strokeWidth="2"
    />
  </Svg>
  );
};

export default PlusIcon;

