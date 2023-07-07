/* eslint-disable max-len */
import React from 'react';
import { Badge, VStack } from 'native-base';
import Svg, { Path } from 'react-native-svg';

type Props = {
  uploadItemsCount?: number;
};

function NavUploadActiveSVG(props: Props) {
  return (
    <VStack>
      {props.uploadItemsCount > 0 && (
        <Badge
          colorScheme="primary"
          rounded="full"
          mb={-4}
          mr={-4}
          zIndex={1}
          variant="outline"
          alignSelf="flex-end"
          _text={{
            fontSize: 12
          }}
        >
          {props.uploadItemsCount}
        </Badge>
      )}
      <Svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 100 100">
        <Path
          id="nav-upload-active.svg"
          fill="#566d31"
          d="M4179.68,3899.65a19.314,19.314,0,0,0,1.27-6.87,19.048,19.048,0,0,0-29.63-15.86,31.745,31.745,0,0,0-59.27,15.86c0,0.53.02,1.07,0.04,1.61a28.616,28.616,0,0,0,9.48,55.6h20.64v-38.14h-12.98a3.179,3.179,0,0,1-2.24-5.43l20.92-20.93a3.163,3.163,0,0,1,4.48,0l20.92,20.93a3.184,3.184,0,0,1-2.25,5.43h-12.97v22.25c0,0.06-.02.13-0.02,0.19v15.7h36.53A25.429,25.429,0,0,0,4179.68,3899.65Z"
          transform="translate(-4073 -3861)"
        />
      </Svg>
    </VStack>
  );
}

export default NavUploadActiveSVG;