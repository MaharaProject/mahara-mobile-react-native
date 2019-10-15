import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import configureStore from './store/store.js';
import LoginScreen from './screens/LoginScreen/LoginScreen.tsx';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.tsx';
import UploadFileScreen from './screens/UploadFileScreen/UploadFileScreen.tsx';

const AppNavigator = createStackNavigator({
  Home: LoginScreen,
  Profile: ProfileScreen,
  UploadFile: UploadFileScreen
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
