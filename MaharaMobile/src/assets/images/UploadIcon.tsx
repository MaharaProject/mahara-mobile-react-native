import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function UploadIcon(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 89" {...props}>
            <Path
                id="nav-upload-active.svg"
                d="M4179.68 3899.65a19.314 19.314 0 001.27-6.87 19.048 19.048 0 00-29.63-15.86 31.745 31.745 0 00-59.27 15.86c0 .53.02 1.07.04 1.61a28.616 28.616 0 009.48 55.6h20.64v-38.14h-12.98a3.179 3.179 0 01-2.24-5.43l20.92-20.93a3.163 3.163 0 014.48 0l20.92 20.93a3.184 3.184 0 01-2.25 5.43h-12.97v22.25c0 .06-.02.13-.02.19v15.7h36.53a25.429 25.429 0 005.08-50.34z"
                transform="translate(-4073 -3861)"
                fill="#000"
                fillRule="evenodd"
            />
        </Svg>
    );
}

export default UploadIcon;
