import { faBars, faHistory, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { I18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { Props } from 'react';
import { Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createSwitchNavigator, NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import styles from '../assets/styles/variables';
import DrawerContainer from '../components/DrawerContainer/DrawerContainer';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import AddItemScreen from '../screens/AddItemScreen/AddItemScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import PendingScreen from '../screens/PendingScreen/PendingScreen';
import PreferencesScreen from '../screens/PreferencesScreen/PreferencesScreen';
import SelectMediaScreen from '../screens/SelectMediaScreen/SelectMediaScreen';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';

type Props = {
  i18n: I18n;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const AppNavigator = (props: Props) => {
  const navigatorStrings = {
    PROFILE: props.i18n._(t`Profile`),
    PENDING: props.i18n._(t`Upload Queue`),
    ADD: props.i18n._(t`Add Item`),
    PROFILE_ACCESSIBILITY_LABEL: props.i18n._(t`Profile Page`),
    ADD_ACCESBILITY_LABEL: props.i18n._(t`Add item to Mahara`),
    PENDING_ACCESSBILITY_LABEL: props.i18n._(t`Pending uploads page`),
    PREFERENCES: props.i18n._(t`Preferences`),
    ABOUT: props.i18n._(t`About`),
    MENU: props.i18n._(t`Menu`)
  };

  // Home page navigator, all other pages get attached to this  navigation stack.
  const AddItemsTabNavigator = createStackNavigator({
    Add: {
      screen: SelectMediaScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.ADD
      }
    },
    AddItem: AddItemScreen,
    About: {
      screen: AboutScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.ABOUT
      }
    },
    Preferences: PreferencesScreen
  });

  const PendingItemsTabNavigator = createStackNavigator({
    Pending: {
      screen: PendingScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.PENDING
      }
    }
  });

  const tabScreenConfig = {
    PendingScreen: {
      screen: PendingItemsTabNavigator,
      navigationOptions: {
        // TODO: add number later -> tabBarBadge: true,
        tabBarLabel: navigatorStrings.PENDING,
        // TODO: add back later for number or can use tabBarBadge
        // tabBarIcon: () => <IconWithBadge {...props} />,
        tabBarIcon: ({ tintColor }) => (
          <FontAwesomeIcon icon={faHistory} color={tintColor} />
        ),
        tabBarAccessibilityLabel: navigatorStrings.PENDING_ACCESSBILITY_LABEL
      }
    },
    Add: {
      screen: AddItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.ADD,
        tabBarIcon: ({tintColor}) => (
          <FontAwesomeIcon icon={faPlusCircle} color={tintColor} />
        ),
        tabBarAccessibilityLabel: navigatorStrings.ADD_ACCESBILITY_LABEL
      }
    },
    Menu: {
      screen: AddItemsTabNavigator, // dummy screen as default handler is ignored
      navigationOptions: {
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faBars} color={styles.colors.light} />
        ),
        tabBarTestID: 'tabBar',
        tabBarAccessibilityLabel: navigatorStrings.MENU,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.toggleDrawer();
          // defaultHandler(); // TODO: keep for future reference
        }
      }
    }
  };

  const androidTabConfig = createMaterialBottomTabNavigator(tabScreenConfig, {
    initialRouteName: 'Add',
    activeColor: styles.colors.light,
    inactiveColor: '#3e2465',
    labeled: false,
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
      About: {
        screen: AboutScreen,
        navigationOptions: {
          drawerIcon: ({ tintColor }) => (
            <FontAwesome5 name="question" size={20} />
          )
        }
      }
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
