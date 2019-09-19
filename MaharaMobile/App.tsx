import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Bananas from './components/Example.js';
import Login from './components/Login.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{height: 110, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={{fontSize: 20, color: 'white', padding: 20}}>Mahara Mobile</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Login />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
