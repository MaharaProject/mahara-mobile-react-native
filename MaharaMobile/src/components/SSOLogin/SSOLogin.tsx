import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {getManufacturer, getModel} from 'react-native-device-info';
import uuid from 'react-native-uuid';
import {WebView} from 'react-native-webview';
import {WebViewNavState} from '../../models/models';

type Props = {
  onUpdateToken: Function;
  url: string;
};

const SSOLogin = (props: Props) => {
  const webref = useRef(null);
  const [token, setToken] = useState('');
  let webview: WebView;

  // Params for SSO login to retain authentication
  const service = 'maharamobile';
  const component = 'module/mobileapi';
  const manufacturer = getManufacturer();
  const model = getModel();
  const id = uuid.v4();
  const maharaURL =
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

  // useEffect(() => {
  //   if (token) {
  //     props.onUpdateToken(token, webref);
  //   }
  // }, [token]);

  const handleWebViewNavigationStateChange = (newNavState: WebViewNavState) => {
    const {url} = newNavState;
    if (url) {
      webview.stopLoading();
    }
  };

  return (
    <WebView
      ref={ref => {
        webview = ref;
      }}
      source={{uri: maharaURL}}
      injectedJavaScript={GET_TOKEN}
      onMessage={event => {
        console.log(event);
        setToken(event.nativeEvent.data);
      }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};

export default SSOLogin;
