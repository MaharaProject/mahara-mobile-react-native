import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { I18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { Props } from 'react';
import { Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import styles from '../assets/styles/variables';
import DrawerContainer from '../components/DrawerContainer/DrawerContainer';
import IconWithBadge from '../components/UI/IconWithBadge/IconWithBadge';
import AddItemScreen from '../screens/AddItemScreen/AddItemScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import PendingScreen from '../screens/PendingScreen/PendingScreen';
import PreferencesScreen from '../screens/PreferencesScreen/PreferencesScreen';
import SelectMediaScreen from '../screens/SelectMediaScreen/SelectMediaScreen';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';

type Props = {
  i18n: I18n;
};

const AppNavigator = (props: Props) => {
  const navigatorStrings = {
    PREFERENCES: props.i18n._(t`Preferences`),
    PENDING: props.i18n._(t`Pending`),
    ADD: props.i18n._(t`Add`)
  };

  const AddItemsTabNavigator = createStackNavigator({
    Add: SelectMediaScreen,
    AddItem: AddItemScreen,
    Preferences: PreferencesScreen
  });

  const PendingItemsTabNavigator = createStackNavigator({
    Pending: {
      screen: PendingScreen,
      navigationOptions: {
        headerTitle: 'Preferences'
      }
    }
  });

  const tabScreenConfig = {
    Add: {
      screen: AddItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.ADD,
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faPlusCircle} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Add item to Mahara'
      }
    },
    PendingScreen: {
      screen: PendingItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.PENDING,
        tabBarIcon: () => <IconWithBadge {...props} />,
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

  const AppTabNavigator =    Platform.OS === 'android' ? androidTabConfig : iOSTabConfig;
  // Navigator with only Authentication screens
  const AuthNavigator = createStackNavigator({
    SiteCheck: SiteCheckScreen,
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

  const DrawerNavigator = createDrawerNavigator(
    {
      MaharaMobile: SwitchNavigator,
      Preferences: {
        screen: PreferencesScreen,
        navigationOptions: {
          drawerIcon: ({ tintColor }) => <FontAwesome5 name="user" size={20} />
        }
      },
      Add: {
        navigationOptions: {
          drawerLabel: 'Add Item'
        },
        screen: AddItemsTabNavigator
      },
      Pending: PendingItemsTabNavigator
    },
    {
      drawerWidth: '60%',
      contentComponent: props => <DrawerContainer {...props} />
    }
  );

  const Navigation = createAppContainer(DrawerNavigator);

  return <Navigation />;
};

export default withI18n()(AppNavigator);
