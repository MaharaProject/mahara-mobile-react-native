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
import SelectMediaScreen from '../screens/SelectMediaScreen/SelectMediaScreen';
import AddItemScreen from '../screens/AddItemScreen/AddItemScreen';
import PendingScreen from '../screens/PendingScreen/PendingScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import styles from '../assets/styles/variables';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';

const AppNavigator = () => {
  const AddItemsTabNavigator = createStackNavigator({
    Add: SelectMediaScreen,
    AddFile: AddItemScreen
  });

  const PendingItemsTabNavigator = createStackNavigator({
    Pending: PendingScreen,
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        headerTitle: 'Back to Pending Items'
      }
    }
  });

  const ProfileTabNavigator = createStackNavigator({
    Profile: ProfileScreen
  });

  const tabScreenConfig = {
    Profile: {
      screen: ProfileTabNavigator,
      navigationOptions: {
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faUser} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Profile page'
      }
    },
    Add: {
      screen: AddItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faPlusCircle} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Add item to Mahara'
      }
    },
    PendingScreen: {
      screen: PendingItemsTabNavigator,
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
    Auth: SiteCheckScreen,
    Login: LoginScreen
  });

  // Main navigator, with route to AppNavigator once authenticated
  const SwitchNavigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthNavigator,
      App: AppTabNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  );

  const DrawerNavigator = createDrawerNavigator({
    MaharaMobile: SwitchNavigator,
    Add: {
      navigationOptions: {
        drawerLabel: 'Add Item'
      },
      screen: AddItemsTabNavigator
    },
    Pending: PendingItemsTabNavigator
  });

  const Navigation = createAppContainer(DrawerNavigator);

  return <Navigation />;
};

export default AppNavigator;
