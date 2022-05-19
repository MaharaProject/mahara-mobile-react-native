// import {t} from '@lingui/macro';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import styles from '../assets/styles/variables';
import i18n from '../i18n';
import LoginMethodScreen, {
  LoginMethodScreenOptions,
} from '../screens/LoginMethodScreen/LoginMethodScreen';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';

// must make it a functional component to get lingui to trigger the translation
// export const navigatorStrings = () => {
//   return {
//     PENDING: i18n._(t`Upload queue`),
//     CREATE: i18n._(t`Create`),
//     ADDITEM: i18n._(t`Add item`),
//     PROFILE_ACCESSIBILITY_LABEL: i18n._(t`Profile page`),
//     ADD_ACCESSIBILITY_LABEL: i18n._(t`Add an item`),
//     PENDING_ACCESSIBILITY_LABEL: i18n._(t`Upload queue page`),
//     PREFERENCES: i18n._(t`Preferences`),
//     ABOUT: i18n._(t`About`),
//     MENU: i18n._(t`Menu`),
//     PRIVACY: i18n._(t`Privacy`),
//     HELP: i18n._(t`Help`),
//     VERSION: i18n._(t`Version`),
//     TERMS: i18n._(t`Terms and conditions`),
//   };
// };

const headerConfigForTabStacks: StackNavigationOptions = {
  headerStyle: { backgroundColor: styles.colors.primary },
  headerTintColor: styles.colors.light,
  headerTitleAlign: 'center',
};

const AddItems = createStackNavigator();
// export const CreateNavigator = () => (
//   <AddItems.Navigator screenOptions={headerConfigForTabStacks}>
//     <AddItems.Screen
//       name="Create"
//       component={SelectMediaScreen}
//       options={{title: navigatorStrings().CREATE}}
//     />
//     <AddItems.Screen
//       name="AddItem"
//       component={AddItemScreen}
//       options={AddItemScreenOptions}
//     />
//   </AddItems.Navigator>
// );

const PendingItems = createStackNavigator();
// export const PendingItemsNavigator = () => (
//   <PendingItems.Navigator screenOptions={headerConfigForTabStacks}>
//     <PendingItems.Screen
//       name="Pending"
//       component={PendingScreen}
//       options={{
//         title: navigatorStrings().PENDING
//       }}
//     />
//     <PendingItems.Screen
//       name="EditItem"
//       component={EditItemScreen}
//       options={EditItemScreenOptions}
//     />
//   </PendingItems.Navigator>
// );

const Menu = createStackNavigator();
// export const MenuNavigator = () => (
//   <Menu.Navigator screenOptions={{...headerConfigForTabStacks}}>
//     <Menu.Screen
//       name="Menu"
//       component={MenuScreen}
//       options={{
//         headerStyle: {
//           backgroundColor: styles.colors.primary,
//           shadowOpacity: 0, // This is for ios
//           elevation: 0 // This is for android
//         },
//         headerLeft: () => <LogoSvg />,
//         title: navigatorStrings().MENU
//       }}
//     />
//     <Menu.Screen
//       name="About"
//       component={AboutScreen}
//       options={{
//         headerTitle: navigatorStrings().ABOUT
//       }}
//     />
//     <Menu.Screen
//       name="Preferences"
//       component={PreferencesScreen}
//       options={{headerTitle: navigatorStrings().PREFERENCES}}
//     />
//     <Menu.Screen
//       name="Terms"
//       component={TermsScreen}
//       options={{headerTitle: navigatorStrings().TERMS}}
//     />
//     <Menu.Screen
//       name="Privacy"
//       component={PrivacyScreen}
//       options={{headerTitle: navigatorStrings().PRIVACY}}
//     />
//     <Menu.Screen
//       name="Help"
//       component={HelpScreen}
//       options={{headerTitle: navigatorStrings().HELP}}
//     />
//     <Menu.Screen
//       name="Version"
//       component={VersionScreen}
//       options={{headerTitle: navigatorStrings().VERSION}}
//     />
//   </Menu.Navigator>
// );

// TODO: test tab config on iOS to see if matches Android

const Auth = createStackNavigator();
export const AuthNavigator = () => (
  <Auth.Navigator screenOptions={{ ...headerConfigForTabStacks }}>
    <Auth.Screen
      name="SiteCheck"
      component={SiteCheckScreen}
      options={{ headerShown: false }}
    />
    <Auth.Screen
      name="LoginMethodScreen"
      component={LoginMethodScreen}
      options={LoginMethodScreenOptions}
    />
  </Auth.Navigator>
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
