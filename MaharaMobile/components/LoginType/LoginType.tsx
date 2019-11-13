import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './LoginType.style';
import { headings } from '../../assets/styles/headings';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  url: string;
  setLoginType: Function;
  toggleUrlField: Function;
  checkServer: Function;
  checkUrl: Function;
  dispatch: any;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  serverPing: boolean;
  isInputHidden: boolean;
  enterUrlWarning: boolean;
}

export default function LoginType(props: Props) {
  return (
    <View style={styles.view}>
      {!props.isInputHidden ?
        <View>
          <Text style={headings.subHeading1}>What is the address of your Mahara?</Text>
          <TextInput
            style={forms.textInput}
            // placeholder={'https://yoursite.edu/'} TODO: put this back in and remove default value for go live
            defaultValue='https://master.dev.mahara.org/'
            onChangeText={(url) => props.checkUrl(url)}
          />
        </View>
      :null }
      {props.enterUrlWarning ?
        <Text>Please enter a URL</Text>
      : null}
      {props.serverPing && props.isInputHidden ?
        <TouchableOpacity onPress={()=>props.toggleUrlField(false)}>
          <Text style={[buttons.md, styles.buttons]}>Enter a different URL</Text>
        </TouchableOpacity>
      : null}
      {!props.isInputHidden ?
        <TouchableOpacity onPress={()=>props.checkServer()}>
          <Text style={[buttons.md, styles.buttons]}>Next</Text>
        </TouchableOpacity>
      : null}
      {props.tokenLogin ?
        <TouchableOpacity
          onPress={()=>props.setLoginType('token')
        }>
          <Text style={[buttons.md, styles.buttons]}>Paste in access token</Text>
        </TouchableOpacity>
      :null }
      {props.localLogin ?
        <TouchableOpacity
          onPress={()=>props.setLoginType('basic')
        }>
          <Text style={[buttons.md, styles.buttons]}>Local Login</Text>
        </TouchableOpacity>
      :null }
      {props.ssoLogin ?
        <TouchableOpacity
          onPress={()=>props.setLoginType('sso')
        }>
          <Text style={[buttons.md, styles.buttons]}>Single Sign On</Text>
        </TouchableOpacity>
      :null }
    </View>
  )
}
