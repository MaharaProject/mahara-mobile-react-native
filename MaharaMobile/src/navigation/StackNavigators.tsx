import React from 'react';
import { t } from '@lingui/macro';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import LogoSvg from 'assets/images/Logo-big';
import styles from 'assets/styles/variables';
import AboutScreen from 'screens/AboutScreen/AboutScreen';
import AddItemScreen, { AddItemScreenOptions } from 'screens/AddItemScreen/AddItemScreen';
import EditItemScreen, { EditItemScreenOptions } from 'screens/EditItemScreen/EditItemScreen';
import HelpScreen from 'screens/HelpScreen/HelpScreen';
import {
  LoginMethodScreen,
  LoginMethodScreenOptions
} from 'screens/LoginMethodScreen/LoginMethodScreen';
import MenuScreen from 'screens/MenuScreen/MenuScreen';
import PendingScreen from 'screens/PendingScreen/PendingScreen';
import PreferencesScreen from 'screens/PreferencesScreen/PreferencesScreen';
import PrivacyScreen from 'screens/PrivacyScreen/PrivacyScreen';
import SelectMediaScreen from 'screens/SelectMediaScreen/SelectMediaScreen';
import SiteCheckScreen from 'screens/SiteCheckScreen/SiteCheckScreen';
import TermsScreen from 'screens/TermsScreen/TermsScreen';
import VersionScreen from 'screens/VersionScreen/VersionScreen';

// must make it a functional component to get lingui to trigger the translation
export const navigatorStrings = () => ({
  PENDING: t`Upload queue`,
  CREATE: t`Create`,
  ADDITEM: t`Add item`,
  PROFILE_ACCESSIBILITY_LABEL: t`Profile page`,
  ADD_ACCESSIBILITY_LABEL: t`Add an item`,
  PENDING_ACCESSIBILITY_LABEL: t`Upload queue page`,
  PREFERENCES: t`Preferences`,
  ABOUT: t`About`,
  MENU: t`Menu`,
  PRIVACY: t`Privacy`,
  HELP: t`Help`,
  VERSION: t`Version`,
  TERMS: t`Terms and conditions`
});

const headerConfigForTabStacks: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTintColor: styles.colors.light,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: styles.font.md
  }
};

const AddItems = createStackNavigator();
export function CreateNavigator() {
  return (
    <AddItems.Navigator screenOptions={headerConfigForTabStacks}>
      <AddItems.Screen
        name="Create"
        component={SelectMediaScreen}
        options={{ title: navigatorStrings().CREATE }}
      />
      <AddItems.Screen name="AddItem" component={AddItemScreen} options={AddItemScreenOptions} />
    </AddItems.Navigator>
  );
}

const PendingItems = createStackNavigator();
export function PendingItemsNavigator() {
  return (
    <PendingItems.Navigator screenOptions={headerConfigForTabStacks}>
      <PendingItems.Screen
        name="Pending"
        component={PendingScreen}
        options={{
          title: navigatorStrings().PENDING
        }}
      />
      <PendingItems.Screen
        name="EditItem"
        component={EditItemScreen}
        options={EditItemScreenOptions}
      />
    </PendingItems.Navigator>
  );
}

const Menu = createStackNavigator();
export function MenuNavigator() {
  return (
    <Menu.Navigator screenOptions={{ ...headerConfigForTabStacks }}>
      <Menu.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerStyle: {
            backgroundColor: styles.colors.primary,
            shadowOpacity: 0, // This is for ios
            elevation: 0 // This is for android
          },
          headerLeft: LogoSvg,
          title: navigatorStrings().MENU
        }}
      />
      <Menu.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: navigatorStrings().ABOUT
        }}
      />
      <Menu.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ headerTitle: navigatorStrings().PREFERENCES }}
      />
      <Menu.Screen
        name="Terms"
        component={TermsScreen}
        options={{ headerTitle: navigatorStrings().TERMS }}
      />
      <Menu.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ headerTitle: navigatorStrings().PRIVACY }}
      />
      <Menu.Screen
        name="Help"
        component={HelpScreen}
        options={{ headerTitle: navigatorStrings().HELP }}
      />
      <Menu.Screen
        name="Version"
        component={VersionScreen}
        options={{ headerTitle: navigatorStrings().VERSION }}
      />
    </Menu.Navigator>
  );
}

// TODO: test tab config on iOS to see if matches Android

const Auth = createStackNavigator();
export function AuthNavigator() {
  return (
    <Auth.Navigator screenOptions={{ ...headerConfigForTabStacks }}>
      <Auth.Screen name="SiteCheck" component={SiteCheckScreen} options={{ headerShown: false }} />
      <Auth.Screen
        name="LoginMethodScreen"
        component={LoginMethodScreen}
        options={LoginMethodScreenOptions}
      />
    </Auth.Navigator>
  );
}

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
