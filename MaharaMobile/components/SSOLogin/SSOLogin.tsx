import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

type Props = {
  ssoLogin: Function;
  url: string;
}

export default function SSOLogin(props: Props) {
  let webview: any = null;
  const [token, setToken] = useState('');
  const url = props.url + 'module/mobileapi/tokenform.php';
  const GET_TOKEN = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(maharatoken));
  })();`;

  useEffect(() => {
    if (token) {
      props.ssoLogin(token, webview);
    }
  }, [token]);

  return (
    <WebView
      ref={ref => (webview = ref)}
      source={{ uri: url }}
      injectedJavaScript={GET_TOKEN}
      onMessage={event => {
        setToken(event.nativeEvent.data);
      }}
    />
  )
}
