import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import configureStore from './store/store.js';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import PendingScreen from './screens/PendingScreen/PendingScreen';
import UploadFileScreen from './screens/UploadFileScreen/UploadFileScreen';

const AppNavigator = createStackNavigator({
  Home: LoginScreen,
  Profile: ProfileScreen,
  UploadFile: UploadFileScreen,
  PendingScreen: PendingScreen
});

const store = configureStore();

const Navigation = createAppContainer(AppNavigator);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
