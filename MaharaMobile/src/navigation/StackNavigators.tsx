import React from 'react';
import { t } from '@lingui/macro';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import LogoSvg from 'assets/images/Logo-big';
import styles from 'assets/styles/variables';
import AboutScreen from 'screens/AboutScreen/AboutScreen';
import AddItemScreen, { AddItemScreenOptions } from 'screens/AddItemScreen/AddItemScreen';
import EditItemScreen, { EditItemScreenOptions } from 'screens/EditItemScreen/EditItemScreen';
import HelpScreen from 'screens/HelpScreen/HelpScreen';
import LoginScreen, { LoginMethodScreenOptions } from 'screens/LoginMethodScreen/LoginMethodScreen';
import MenuScreen from 'screens/MenuScreen/MenuScreen';
import PendingScreen from 'screens/PendingScreen/PendingScreen';
import PreferencesScreen from 'screens/PreferencesScreen/PreferencesScreen';
import PrivacyScreen from 'screens/PrivacyScreen/PrivacyScreen';
import SelectMediaScreen from 'screens/SelectMediaScreen/SelectMediaScreen';
import SiteCheckScreen from 'screens/SiteCheckScreen/SiteCheckScreen';
import TermsScreen from 'screens/TermsScreen/TermsScreen';
import VersionScreen from 'screens/VersionScreen/VersionScreen';

const headerConfigForTabStacks: StackNavigationOptions = {
  headerStyle: { backgroundColor: styles.colors.primary },
  headerTintColor: styles.colors.light,
  headerTitleAlign: 'center',
  headerTitleStyle: { fontFamily: 'OpenSans-Bold', fontSize: styles.font.md }
};

const AddItems = createStackNavigator();
export function CreateNavigator() {
  return (
    <AddItems.Navigator screenOptions={headerConfigForTabStacks}>
      <AddItems.Screen name="Create" component={SelectMediaScreen} options={{ title: t`Create` }} />
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
        options={{ title: t`Upload queue` }}
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
          title: t`Menu`
        }}
      />
      <Menu.Screen name="About" component={AboutScreen} options={{ title: t`About` }} />
      <Menu.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ title: t`Preferences` }}
      />
      <Menu.Screen
        name="Terms"
        component={TermsScreen}
        options={{ title: t`Terms and conditions` }}
      />
      <Menu.Screen name="Privacy" component={PrivacyScreen} options={{ title: t`Privacy` }} />
      <Menu.Screen name="Help" component={HelpScreen} options={{ title: t`Help` }} />
      <Menu.Screen name="Version" component={VersionScreen} options={{ title: t`Version` }} />
    </Menu.Navigator>
  );
}

const Auth = createStackNavigator();
export function AuthNavigator() {
  return (
    <Auth.Navigator screenOptions={{ ...headerConfigForTabStacks }}>
      <Auth.Screen name="SiteCheck" component={SiteCheckScreen} options={{ headerShown: false }} />
      <Auth.Screen
        name="LoginMethodScreen"
        component={LoginScreen}
        options={LoginMethodScreenOptions}
      />
    </Auth.Navigator>
  );
}
