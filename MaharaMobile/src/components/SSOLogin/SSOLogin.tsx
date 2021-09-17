import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {getManufacturer, getModel} from 'react-native-device-info';
import uuid from 'react-native-uuid';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

type Props = {
  onUpdateToken: Function;
  url: string;
};

const SSOLogin = (props: Props) => {
  let webref: WebView = null;
  const [newToken, setNewToken] = useState('');

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
  const GET_TOKEN_JS = `(
    function() {
    window.ReactNativeWebView.postMessage(maharatoken);
    }
  )();`;

  useEffect(() => {
    if (newToken !== '') {
      console.log(`token: ${newToken}`);
      props.onUpdateToken(newToken);
      webref.stopLoading();
    }
  }, [newToken]);

  const handleWebViewNavigationStateChange = newNavState => {
    const newURL = newNavState.url;

    if (newURL) {
      console.log(`new url: ${newURL}`);
      // webref.stopLoading();
    }
  };

  return (
    <WebView
      ref={ref => {
        webref = ref;
      }}
      source={{uri: url}}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      injectedJavaScript={GET_TOKEN_JS}
      incognito
      onMessage={(event: WebViewMessageEvent) => {
        if (event.nativeEvent.data) {
          setNewToken(event.nativeEvent.data);
        }
      }}
    />
  );
};

export default SSOLogin;
