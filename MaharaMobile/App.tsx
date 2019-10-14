import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen/LoginScreen.tsx';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.tsx';
import UploadFileScreen from './screens/UploadFileScreen/UploadFileScreen.tsx';

const AppNavigator = createStackNavigator({
  Home: LoginScreen,
  Profile: ProfileScreen,
  UploadFile: UploadFileScreen
});

const App = createAppContainer(AppNavigator);

export default App;
