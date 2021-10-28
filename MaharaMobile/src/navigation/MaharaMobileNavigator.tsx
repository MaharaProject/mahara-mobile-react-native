import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import NavAddSVG from '../assets/images/nav-add';
import NavAddActiveSVG from '../assets/images/nav-add-active';
import NavMenuSVG from '../assets/images/nav-menu';
import NavMenuActiveSVG from '../assets/images/nav-menu-active';
import NavUploadSVG from '../assets/images/nav-upload';
import NavUploadActiveSVG from '../assets/images/nav-upload-active';
import styles from '../assets/styles/variables';
import {
  PendingItemsNavigator,
  CreateNavigator,
  MenuNavigator,
  navigatorStrings
} from './StackNavigators';

const BottomTab = createBottomTabNavigator();

const tabOptions = {
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: styles.colors.navActiveGreenTint,
  tabBarInactiveTintColor: styles.colors.quaternary,
  tabBarStyle: {
    backgroundColor: styles.colors.navBarGreen,
    borderTopWidth: 0
  },
  tabBarShowLabel: false
};

const MaharaMobileNavigator = () => (
  <BottomTab.Navigator initialRouteName="Create tab">
    <BottomTab.Screen
      name="Upload queue tab"
      component={PendingItemsNavigator}
      options={{
        ...tabOptions,
        tabBarLabel: navigatorStrings().PENDING,
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (focused === false) {
            return <NavUploadSVG />;
          }
          return <NavUploadActiveSVG />;
        },
        tabBarAccessibilityLabel: navigatorStrings().PENDING_ACCESSIBILITY_LABEL
      }}
    />
    <BottomTab.Screen
      name="Create tab"
      component={CreateNavigator}
      options={{
        ...tabOptions,
        headerShown: false,
        tabBarLabel: navigatorStrings().CREATE,
        tabBarIcon: ({focused}) => {
          if (focused === false) {
            return <NavAddSVG />;
          }
          return <NavAddActiveSVG />;
        },
        tabBarAccessibilityLabel: navigatorStrings().ADD_ACCESSIBILITY_LABEL
      }}
    />
    <BottomTab.Screen
      name="Menu tab"
      component={MenuNavigator}
      options={{
        ...tabOptions,
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (focused === false) {
            return <NavMenuSVG />;
          }
          return <NavMenuActiveSVG />;
        },
        tabBarTestID: 'tabBar',
        tabBarAccessibilityLabel: navigatorStrings().MENU
      }}
    />
  </BottomTab.Navigator>
);

export default MaharaMobileNavigator;
