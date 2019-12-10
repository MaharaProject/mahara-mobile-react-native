import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faPlusCircle, faHistory } from '@fortawesome/free-solid-svg-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import styles from './assets/styles/variables';
import configureStore from './store/store';
import SiteCheckScreen from './screens/SiteCheckScreen/SiteCheckScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import PendingScreen from './screens/PendingScreen/PendingScreen';
import AddScreen from './screens/AddScreen/AddScreen';
import DetailsScreen from './screens/DetailsScreen/DetailsScreen';

const AppNavigator = createStackNavigator({
  Home: SiteCheckScreen,
  Login: LoginScreen,
  Profile: ProfileScreen,
  Add: AddScreen,
  PendingScreen: PendingScreen,
  Details: DetailsScreen
});

const tabScreenConfig = {
  Profile: {
    screen: ProfileScreen, navigationOptions: {
      tabBarIcon: () => {
        return <FontAwesomeIcon icon={faUser} color={styles.colors.light} />
      },
    },
  },
  Add: {
    screen: AppNavigator, navigationOptions:
    {
      tabBarLabel: 'Add',
      tabBarIcon: () => {
        return <FontAwesomeIcon icon={faPlusCircle} color={styles.colors.light} />
      }
    }
  },
  PendingScreen: {
    screen: PendingScreen, navigationOptions: {
      tabBarLabel: 'Pending ',
      tabBarIcon: () => {
        return <FontAwesomeIcon icon={faHistory} color={styles.colors.light} />
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
    },

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
  Auth: SiteCheckScreen
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
