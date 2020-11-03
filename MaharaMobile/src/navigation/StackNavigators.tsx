import {t} from '@lingui/macro';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import React from 'react';
import LogoSvg from '../assets/images/Logo';
import styles from '../assets/styles/variables';
import i18n from '../i18n';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import AddItemScreen, {
  AddItemScreenOptions
} from '../screens/AddItemScreen/AddItemScreen';
import EditItemScreen, {
  EditItemScreenOptions
} from '../screens/EditItemScreen/EditItemScreen';
import HelpScreen from '../screens/HelpScreen/HelpScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';
import PendingScreen from '../screens/PendingScreen/PendingScreen';
import PreferencesScreen from '../screens/PreferencesScreen/PreferencesScreen';
import PrivacyScreen from '../screens/PrivacyScreen/PrivacyScreen';
import SelectMediaScreen from '../screens/SelectMediaScreen/SelectMediaScreen';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';
import TermsScreen from '../screens/TermsScreen/TermsScreen';
import VersionScreen from '../screens/VersionScreen/VersionScreen';

type Props = {
  navigation: any;
  isGuest: boolean;
  userName: string;
};

// must make it a functional component to get lingui to trigger the translation
export const navigatorStrings = () => {
  return {
    PENDING: i18n._(t`Upload queue`),
    ADD: i18n._(t`Add`),
    PROFILE_ACCESSIBILITY_LABEL: i18n._(t`Profile page`),
    ADD_ACCESSIBILITY_LABEL: i18n._(t`Add an item`),
    PENDING_ACCESSIBILITY_LABEL: i18n._(t`Upload queue page`),
    PREFERENCES: i18n._(t`Preferences`),
    ABOUT: i18n._(t`About`),
    MENU: i18n._(t`Menu`),
    PRIVACY: i18n._(t`Privacy`),
    HELP: i18n._(t`Help`),
    VERSION: i18n._(t`Version`),
    TERMS: i18n._(t`Terms and conditions`)
  };
};

const headerConfigForTabStacks: StackNavigationOptions = {
  headerStyle: {backgroundColor: styles.colors.primary},
  headerTintColor: styles.colors.light,
  headerTitleAlign: 'center'
};

const AddItemsStackNavigator = createStackNavigator();
export const AddItemsNavigator = () => (
  <AddItemsStackNavigator.Navigator screenOptions={headerConfigForTabStacks}>
    <AddItemsStackNavigator.Screen
      name="Add"
      component={SelectMediaScreen}
      options={{title: navigatorStrings().ADD}}
    />
    <AddItemsStackNavigator.Screen
      name="AddItem"
      component={AddItemScreen}
      options={AddItemScreenOptions}
    />
  </AddItemsStackNavigator.Navigator>
);

const PendingItemsStackNavigator = createStackNavigator();
export const PendingItemsNavigator = () => (
  <PendingItemsStackNavigator.Navigator
    screenOptions={headerConfigForTabStacks}>
    <PendingItemsStackNavigator.Screen
      name="Pending"
      component={PendingScreen}
      options={{
        title: navigatorStrings().PENDING
      }}
    />
    <PendingItemsStackNavigator.Screen
      name="EditItem"
      component={EditItemScreen}
      options={EditItemScreenOptions}
    />
  </PendingItemsStackNavigator.Navigator>
);

const MenuStackNavigator = createStackNavigator();
export const MenuNavigator = () => (
  <MenuStackNavigator.Navigator screenOptions={{...headerConfigForTabStacks}}>
    <MenuStackNavigator.Screen
      name="Menu"
      component={MenuScreen}
      options={{
        headerStyle: {
          backgroundColor: styles.colors.primary,
          shadowOpacity: 0, // This is for ios
          elevation: 0 // This is for android
        },
        headerLeft: () => <LogoSvg />,
        title: navigatorStrings().MENU
      }}
    />
    <MenuStackNavigator.Screen
      name="About"
      component={AboutScreen}
      options={{
        headerTitle: navigatorStrings().ABOUT
      }}
    />
    <MenuStackNavigator.Screen
      name="Preferences"
      component={PreferencesScreen}
      options={{headerTitle: navigatorStrings().PREFERENCES}}
    />
    <MenuStackNavigator.Screen
      name="Terms"
      component={TermsScreen}
      options={{headerTitle: navigatorStrings().TERMS}}
    />
    <MenuStackNavigator.Screen
      name="Privacy"
      component={PrivacyScreen}
      options={{headerTitle: navigatorStrings().PRIVACY}}
    />
    <MenuStackNavigator.Screen
      name="Help"
      component={HelpScreen}
      options={{headerTitle: navigatorStrings().HELP}}
    />
    <MenuStackNavigator.Screen
      name="Version"
      component={VersionScreen}
      options={{headerTitle: navigatorStrings().VERSION}}
    />
  </MenuStackNavigator.Navigator>
);

// TODO: test tab config on iOS to see if matches Android

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator initialRouteName="AuthLoad" headerMode="none">
    <AuthStackNavigator.Screen name="SiteCheck" component={SiteCheckScreen} />
    <AuthStackNavigator.Screen name="LoginScreen" component={LoginScreen} />
  </AuthStackNavigator.Navigator>
);

// const androidTabConfig = createMaterialBottomTabNavigator(tabScreenConfig, {
//   initialRouteName: 'Add',
//   activeColor: styles.colors.light,
//   inactiveColor: styles.colors.tertiary,
//   labeled: false,
//   barStyle: {
//     backgroundColor: styles.colors.light2
//   }
// });

// const iOSTabConfig = createBottomTabNavigator(tabScreenConfig, {
//   initialRouteName: 'Add',
//   tabBarOptions: {
//     showLabel: false,
//     activeTintColor: styles.colors.light,
//     inactiveTintColor: styles.colors.tertiary,
//     style: {
//       backgroundColor: styles.colors.light2
//     },
//     tabStyle: {
//       alignContent: 'space-between'
//     }
//   }
// });

// Platform.OS === 'android' ? androidTabConfig : iOSTabConfig;
