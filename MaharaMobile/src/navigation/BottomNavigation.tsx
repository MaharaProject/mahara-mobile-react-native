import React from 'react';
import { t } from '@lingui/macro';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavAddSVG from 'assets/images/nav-add';
import NavAddActiveSVG from 'assets/images/nav-add-active';
import NavMenuSVG from 'assets/images/nav-menu';
import NavMenuActiveSVG from 'assets/images/nav-menu-active';
import NavUploadSVG from 'assets/images/nav-upload';
import NavUploadActiveSVG from 'assets/images/nav-upload-active';
import styles from 'assets/styles/variables';
import { CreateNavigator, MenuNavigator, PendingItemsNavigator } from './StackNavigators';

const tabOptions = {
    tabBarHideOnKeyboard: true,
    tabBarActiveTintColor: styles.colors.navActiveGreenTint,
    tabBarInactiveTintColor: styles.colors.quaternary,
    tabBarStyle: { backgroundColor: styles.colors.navBarGreen },
    tabBarShowLabel: false
};

const BottomTab = createBottomTabNavigator();

type Props = {
    uploadItemsCount?: number;
};

function BottomNavigation(props: Props) {
    return (
        <BottomTab.Navigator initialRouteName="Create tab">
            <BottomTab.Screen
                name="Upload queue tab"
                component={PendingItemsNavigator}
                options={{
                    ...tabOptions,
                    tabBarLabel: t`Upload queue`,
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <NavUploadActiveSVG uploadItemsCount={props.uploadItemsCount} />
                        ) : (
                            <NavUploadSVG uploadItemsCount={props.uploadItemsCount} />
                        ),
                    tabBarAccessibilityLabel: t`Upload queue page`
                }}
            />
            <BottomTab.Screen
                name="Create tab"
                component={CreateNavigator}
                options={{
                    ...tabOptions,
                    headerShown: false,
                    tabBarLabel: t`Create`,
                    tabBarIcon: ({ focused }) => (focused ? <NavAddActiveSVG /> : <NavAddSVG />),
                    tabBarAccessibilityLabel: t`Add an item`
                }}
            />
            <BottomTab.Screen
                name="Menu tab"
                component={MenuNavigator}
                options={{
                    ...tabOptions,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (focused ? <NavMenuActiveSVG /> : <NavMenuSVG />),
                    tabBarAccessibilityLabel: t`Menu`
                }}
            />
        </BottomTab.Navigator>
    );
}

export default BottomNavigation;
