import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
  faUser,
  faPlusCircle,
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AddScreen from '../screens/AddScreen/AddScreen';
import AddFileScreen from '../screens/AddFileScreen/AddFileScreen';
import PendingScreen from '../screens/PendingScreen/PendingScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import styles from '../assets/styles/variables';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';

const AppNavigator = () => {
  const AddItemsNavigator = createStackNavigator({
    AddItems: AddScreen,
    AddFile: AddFileScreen
  });

  const PendingItemsNavigator = createStackNavigator({
    Pending: PendingScreen,
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        headerTitle: 'Back to Pending Items'
      }
    }
  });

  const tabScreenConfig = {
    ProfileTab: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faUser} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Profile page'
      }
    },
    AddItemsTab: {
      screen: AddItemsNavigator,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faPlusCircle} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Add item to Mahara'
      }
    },
    PendingTab: {
      screen: PendingItemsNavigator,
      navigationOptions: {
        tabBarLabel: 'Pending ',
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faHistory} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Pending uploads page'
      }
    }
  };

  const androidTabConfig = createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: styles.colors.light,
    barStyle: {
      backgroundColor: styles.colors.secondary
    }
  });

  const iOSTabConfig = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      activeBackgroundColor: styles.colors.secondary,
      activeTintColor: styles.colors.light
    }
  });

  const AppTabNavigator = Platform.OS === 'android' ? androidTabConfig : iOSTabConfig;

  // Navigator with only LoginScreen
  const AuthNavigator = createStackNavigator({
    SiteCheck: SiteCheckScreen,
    Login: LoginScreen
  });

  // Main navigator, with route to AppNavigator once authenticated
  const MainNavigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppTabNavigator,
      Auth: AuthNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  );

  const Navigation = createAppContainer(MainNavigator);
  return <Navigation />;
};

export default AppNavigator;
