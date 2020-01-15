import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';

type Props = {
  ssoLogin: Function;
  url: string;
}

export default function SSOLogin(props: Props) {
  let webref: any = useRef(null);
  const [token, setToken] = useState('');
  const url = props.url + 'module/mobileapi/tokenform.php';
  const GET_TOKEN = `(function() {
    window.ReactNativeWebView.postMessage(maharatoken);
  })();`;

  setTimeout(() => {
    if (webref) {
      webref.injectJavaScript(GET_TOKEN);
    }
  }, 1000);

  useEffect(() => {
    if (token) {
      props.ssoLogin(token, webref);
    }
  }, [token]);

  return (
    <WebView
      ref={ref => {webref = ref}}
      source={{ uri: url }}
      injectedJavaScript={GET_TOKEN}
      onMessage={event => {
        setToken(event.nativeEvent.data);
      }}
    />
  )
}
