import React from 'react';
import { Platform } from 'react-native';
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

import styles from './assets/styles/variables';
import configureStore from './store/store';
import SiteCheckScreen from './screens/SiteCheckScreen/SiteCheckScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import PendingScreen from './screens/PendingScreen/PendingScreen';
import AddScreen from './screens/AddScreen/AddScreen';
import AddFileScreen from './screens/AddFileScreen/AddFileScreen';
import DetailsScreen from './screens/DetailsScreen/DetailsScreen';

const App = () => {
  const store = configureStore();

  // Render the app container component with the provider around it
  return (
    <Provider store={store}>
      <I18nProvider language="en">
        <NavigationContainer />
      </I18nProvider>
    </Provider>
  );
};

const NavigationContainer = () => {
  const AddItemsNavigator = createStackNavigator({
    Add: AddScreen,
    AddFile: AddFileScreen,
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
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faUser} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Profile page'
      }
    },
    Add: {
      screen: AddItemsNavigator,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faPlusCircle} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Add item to Mahara'
      }
    },
    PendingScreen: {
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

  // Check the OS system for correct styles
  const AppTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: styles.colors.light,
      // shifting: true,
      barStyle: {
        backgroundColor: styles.colors.secondary,
      },
    })
    : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: {
        activeBackgroundColor: styles.colors.secondary,
        activeTintColor: styles.colors.light,
      },
    });

  // Navigator with only LoginScreen
  const AuthNavigator = createStackNavigator({
    Auth: SiteCheckScreen,
    Login: LoginScreen
  });

  // Main navigator, with route to AppNavigator once authenticated
  const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    App: AppTabNavigator
  });
  const Navigation = createAppContainer(MainNavigator);


  return <Navigation />;
};

export default App;
