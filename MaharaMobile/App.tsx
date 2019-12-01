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
import { styles } from './assets/styles/variables';


const AppNavigator = createStackNavigator({
  // Home: LoginScreen,
  Add: AddScreen,
  Profile: ProfileScreen,
  PendingScreen: PendingScreen
});

const AppTabNavigator = createBottomTabNavigator({
  Profile: ProfileScreen,
  Add: AppNavigator,
  // Home: LoginScreen,
  PendingScreen: PendingScreen
},
  {
    tabBarOptions: {
      activeBackgroundColor: styles.colors.secondary,
      activeTintColor: styles.colors.light
    }
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
