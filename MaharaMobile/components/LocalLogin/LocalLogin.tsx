/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import uuid from "react-native-uuid";
import { getManufacturer, getModel } from 'react-native-device-info';

import generic from '../../assets/styles/generic';
import { forms } from '../../assets/styles/forms';
import { headingStyles } from '../../assets/styles/headings';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  url: string;
  verifyLogin: Function;
  setUsername: Function;
  setPassword: Function;
};

export default function LocalLogin(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLogins = async () => {
    const manufacturer = getManufacturer();
    const model = getModel();
    const id = uuid.v4();
    const url = props.url + 'module/mobileapi/json/token.php';

    const body = new FormData;
    body.append('username', username);
    body.append('password', password);
    body.append('service', 'maharamobile');
    body.append('component', 'module/mobileapi');
    body.append('clientname', 'Mahara Mobile');
    body.append('clientenv',  Platform.OS + ', ' + manufacturer + ', ' + model);
    body.append('id', id);

    const config = {
      method: 'POST',
      body: body
    };

    try {
      const request = await fetch(url, config);
      const json = await request.json();
      props.setUsername(username);
      props.setPassword(password);
      props.verifyLogin(json.token);
      console.log('token', json.token.trim());
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={generic.wrap}>
      <Text style={headingStyles.mainHeading}>Login via Token</Text>
      <TextInput
        style={forms.textInput}
        placeholder="Enter your username"
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        style={forms.textInput}
        secureTextEntry={true}
        placeholder="Enter your password"
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity onPress={() => checkLogins()}>
        <Text style={buttons.lg}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
