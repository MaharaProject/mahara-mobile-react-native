import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {getManufacturer, getModel} from 'react-native-device-info';
import uuid from 'react-native-uuid';
import {WebView} from 'react-native-webview';

type Props = {
  onUpdateToken: Function;
  url: string;
};

export default function SSOLogin(props: Props) {
  let webref = useRef(null);
  const [token, setToken] = useState('');

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
  const GET_TOKEN = `(function() {
    window.ReactNativeWebView.postMessage(maharatoken);
  })();`;

  useEffect(() => {
    if (token) {
      props.onUpdateToken(token, webref);
    }
  }, [token]);

  return (
    <WebView
      ref={ref => {
        webref = ref;
      }}
      source={{uri: url}}
      injectedJavaScript={GET_TOKEN}
      onMessage={event => {
        setToken(event.nativeEvent.data);
      }}
    />
  );
}
