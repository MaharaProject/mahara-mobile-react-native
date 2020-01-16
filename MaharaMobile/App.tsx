import React from 'react';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faPlusCircle,
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { I18nProvider } from '@lingui/react';

import configureStore from './store/store';
import AppNavigator from './navigations/app-navigator';

const App = () => {
  const store = configureStore();

  // Render the app container component with the provider around it
  return (
    <Provider store={store}>
      <I18nProvider language="en">
        <AppNavigator />
      </I18nProvider>
    </Provider>
  );
};

export default App;
