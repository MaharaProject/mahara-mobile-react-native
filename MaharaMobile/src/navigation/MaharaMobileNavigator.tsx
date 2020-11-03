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
  AddItemsNavigator,
  MenuNavigator,
  navigatorStrings
} from './StackNavigators';

const BottomTabsNavigator = createBottomTabNavigator();

const MaharaMobileNavigator = () => (
  <BottomTabsNavigator.Navigator
    initialRouteName="Add"
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: styles.colors.navActiveGreenTint,
      inactiveTintColor: styles.colors.quaternary,
      style: {backgroundColor: styles.colors.navBarGreen},
      showLabel: false
    }}>
    <BottomTabsNavigator.Screen
      name="PendingScreen"
      component={PendingItemsNavigator}
      options={{
        tabBarLabel: navigatorStrings().PENDING,
        tabBarIcon: ({focused}) => {
          if (focused === false) {
            return <NavUploadSVG />;
          }
          return <NavUploadActiveSVG />;
        },
        tabBarAccessibilityLabel: navigatorStrings().PENDING_ACCESSIBILITY_LABEL
      }}
    />
    <BottomTabsNavigator.Screen
      name="Add"
      component={AddItemsNavigator}
      options={{
        tabBarLabel: navigatorStrings.ADD,
        tabBarIcon: ({focused}) => {
          if (focused === false) {
            return <NavAddSVG />;
          }
          return <NavAddActiveSVG />;
        },
        tabBarAccessibilityLabel: navigatorStrings().ADD_ACCESSIBILITY_LABEL
      }}
    />
    <BottomTabsNavigator.Screen
      name="Menu"
      component={MenuNavigator}
      options={{
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
  </BottomTabsNavigator.Navigator>
);

export default MaharaMobileNavigator;
