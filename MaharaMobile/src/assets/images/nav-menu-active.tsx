/* eslint-disable max-len */
import React from 'react';
import { VStack } from 'native-base';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function NavMenuActiveSVG() {
  return (
    <VStack>
      <Svg xmlns="http://www.w3.org/2000/svg" width="70" height="32" viewBox="0 -10 130 100">
        <Path
          id="nav-menu-active.svg"
          fill="#566d31"
          d="M4717.8,3928.83h-81.71a3.139,3.139,0,0,0-3.14,3.14v7.85a3.147,3.147,0,0,0,3.14,3.15h81.71a3.147,3.147,0,0,0,3.14-3.15v-7.85A3.139,3.139,0,0,0,4717.8,3928.83Zm0-31.43h-81.71a3.145,3.145,0,0,0-3.14,3.14v7.86a3.139,3.139,0,0,0,3.14,3.14h81.71a3.139,3.139,0,0,0,3.14-3.14v-7.86A3.145,3.145,0,0,0,4717.8,3897.4Zm0-31.42h-81.71a3.145,3.145,0,0,0-3.14,3.14v7.86a3.145,3.145,0,0,0,3.14,3.14h81.71a3.145,3.145,0,0,0,3.14-3.14v-7.86A3.145,3.145,0,0,0,4717.8,3865.98Z"
          transform="translate(-4632.94 -3865.97)"
        />
      </Svg>
    </VStack>
  );
}

export default NavMenuActiveSVG;