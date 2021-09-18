import React, {useRef} from 'react';
import {Platform} from 'react-native';
import {getManufacturer, getModel} from 'react-native-device-info';
import uuid from 'react-native-uuid';
import {WebView} from 'react-native-webview';

type Props = {
  url: string;
  onGetToken: Function;
};

export default function SSOLogin(props: Props) {
  let webref = useRef(null);

  // Params for SSO login to retain authentication
  const service = 'maharamobile';
  const component = 'module/mobileapi';
  const manufacturer = getManufacturer();
  const model = getModel();
  const id = uuid.v4();
  const url =
    `${props.url}module/mobileapi/tokenform.php` +
    `?service=${service}&component=${encodeURIComponent(
      component
    )}&clientname=${encodeURIComponent(
      'Mahara Mobile'
    )}&clientenv=${encodeURIComponent(
      `${Platform.OS}, ${manufacturer}, ${model}`
    )}&clientguid=${id}#sso`;

  // Function to watch window until it has obtained maharatoken
  const GET_TOKEN_JS = `(function() {
    window.ReactNativeWebView.postMessage(maharatoken);
  })();`;

  return (
    <WebView
      ref={ref => {
        webref = ref;
      }}
      source={{uri: url}}
      incognito
      injectedJavaScript={GET_TOKEN_JS}
      onMessage={event => {
        // check for token inside event.nativeEvent.data
        if (!event.data && event.data !== '') {
          const token = event.nativeEvent.data;
          webref.stopLoading();
          props.onGetToken(token);
        }
      }}
    />
  );
}
