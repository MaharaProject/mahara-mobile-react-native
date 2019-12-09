import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faPlusCircle, faHistory } from '@fortawesome/free-solid-svg-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import configureStore from './store/store';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import PendingScreen from './screens/PendingScreen/PendingScreen';
import AddScreen from './screens/AddScreen/AddScreen';
import { styles } from './assets/styles/variables';
import { Colors } from 'react-native-paper';


const AppNavigator = createStackNavigator({
  Add: AddScreen,
  Profile: ProfileScreen,
  PendingScreen: PendingScreen
});

const tabScreenConfig = {
  Profile: {
    screen: ProfileScreen, navigationOptions: {
      tabBarIcon: () => {
        return <FontAwesomeIcon icon={faUser} />
      },
    },
  },
  Add: {
    screen: AppNavigator, navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: () => {
        return <FontAwesomeIcon icon={faPlusCircle} />
      }
    }
  },
  PendingScreen: {
    screen: PendingScreen, navigationOptions: {
      tabBarLabel: 'Pending ',
      tabBarIcon: () => {
        return <FontAwesomeIcon icon={faHistory} />
      }
    }
  }
};

// Check the OS system for correct styles
const AppTabNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: styles.colors.light,
    // shifting: true,
    barStyle: {
      backgroundColor: styles.colors.secondary
    }
  }) :
  createBottomTabNavigator(tabScreenConfig,
    {
      tabBarOptions: {
        activeBackgroundColor: styles.colors.secondary,
        activeTintColor: styles.colors.light
      }
    });

// Navigator with only LoginScreen 
const AuthNavigator = createStackNavigator({
  Auth: LoginScreen
});

// Main navigator, with route to AppNavigator once authenticated
const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  App: AppTabNavigator
});

const store = configureStore();

const Navigation = createAppContainer(MainNavigator);

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
