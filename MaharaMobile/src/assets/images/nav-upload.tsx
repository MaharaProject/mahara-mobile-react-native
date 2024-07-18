/* eslint-disable max-len */
import React from 'react';
import { Badge, Text, VStack } from '@gluestack-ui/themed-native-base';
import Svg, { Path } from 'react-native-svg';

type Props = {
  uploadItemsCount?: number;
};

function NavUploadSVG(props: Props) {
  const queueEmpty = props.uploadItemsCount?.toPrecision();
  return (
    <VStack>
      {!queueEmpty && (
        <Badge
          colorScheme="primary"
          rounded="full"
          mb={-4}
          mr={-4}
          zIndex={-1}
          alignSelf="flex-end"
          fontSize="sm"
        >
          <Text>➕</Text>
        </Badge>
      )}

      <Svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 100 100">
        <Path
          id="nav-upload.svg"
          fill="#566d31"
          d="M4196.61,3906.28a27.818,27.818,0,0,0-13.29-8.9,21.519,21.519,0,0,0-30.67-24.33,34.238,34.238,0,0,0-62.6,19.15,31.112,31.112,0,0,0,12.03,59.79h23.13v-43.14h-15.48a0.849,0.849,0,0,1-.29-0.06,0.566,0.566,0,0,1-.27-0.24,0.739,0.739,0,0,1-.12-0.39,0.619,0.619,0,0,1,.21-0.47l20.92-20.93a0.611,0.611,0,0,1,.47-0.19,0.641,0.641,0,0,1,.47.18l20.92,20.94a0.586,0.586,0,0,1,.2.46,0.694,0.694,0,0,1-.2.5l-0.19.14a0.849,0.849,0,0,1-.29.06h-15.47v24.62l-0.01.07-0.01.12v18.33h39.03A27.93,27.93,0,0,0,4196.61,3906.28Zm-5.32,33.99a22.8,22.8,0,0,1-16.19,6.71h-34.03v-13.13l0.02-.12v-19.88h10.47a5.65,5.65,0,0,0,4.8-2.64,5.742,5.742,0,0,0,.88-3.06,5.637,5.637,0,0,0-1.67-4l-20.91-20.93a5.673,5.673,0,0,0-8.02,0l-20.91,20.93a5.629,5.629,0,0,0-1.68,4.01,5.77,5.77,0,0,0,1.55,3.91,5.594,5.594,0,0,0,1.82,1.3,5.754,5.754,0,0,0,2.31.48h10.48v33.13h-18.13a26.111,26.111,0,0,1-8.66-50.73l1.74-.62-0.07-1.84c-0.02-.53-0.04-1.04-0.04-1.51a29.248,29.248,0,0,1,54.61-14.6l1.33,2.32,2.23-1.5a16.546,16.546,0,0,1,25.73,13.78,16.793,16.793,0,0,1-1.1,5.97l-1.06,2.77,2.89,0.58A22.93,22.93,0,0,1,4191.29,3940.27Z"
          transform="translate(-4071 -3858)"
        />
      </Svg>
    </VStack>
  );
}

export default NavUploadSVG;
