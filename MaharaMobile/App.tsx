import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import configureStore from './store/store';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import PendingScreen from './screens/PendingScreen/PendingScreen';
import AddScreen from './screens/AddScreen/AddScreen';

const AppNavigator = createStackNavigator({
  Home: LoginScreen,
  Profile: ProfileScreen,
  Add: AddScreen,
  PendingScreen: PendingScreen
});

const AppTabNavigator = createBottomTabNavigator({
  App: AppNavigator,
  Home: LoginScreen,
  Profile: ProfileScreen,
  Add: AddScreen,
  PendingScreen: PendingScreen
});

const store = configureStore();

const Navigation = createAppContainer(AppTabNavigator);

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
