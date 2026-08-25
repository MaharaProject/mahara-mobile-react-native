import React, { useCallback } from 'react';
import { t } from '@lingui/macro';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageProps } from 'react-native';
import NavAddSVG from '../assets/images/nav-add';
import NavAddActiveSVG from '../assets/images/nav-add-active';
import NavMenuSVG from '../assets/images/nav-menu';
import NavMenuActiveSVG from '../assets/images/nav-menu-active';
import NavUploadSVG from '../assets/images/nav-upload';
import NavUploadActiveSVG from '../assets/images/nav-upload-active';
import styles from '../assets/styles/variables';
import { CreateNavigator, MenuNavigator, PendingItemsNavigator } from './StackNavigators';

const tabOptions = {
    tabBarHideOnKeyboard: true,
    tabBarActiveTintColor: styles.colors.navActiveGreenTint,
    tabBarInactiveTintColor: styles.colors.quaternary,
    tabBarStyle: { backgroundColor: styles.colors.navBarGreen, paddingTop: 10 },
    tabBarShowLabel: false
};

const BottomTab = createBottomTabNavigator();

type Props = {
    uploadItemsCount?: number;
};

function UploadIcon({
    focused,
    uploadItemsCount
}: {
    focused: boolean;
    uploadItemsCount?: number;
}) {
    return focused ? (
        <NavUploadActiveSVG uploadItemsCount={uploadItemsCount} />
    ) : (
        <NavUploadSVG uploadItemsCount={uploadItemsCount} />
    );
}

function CreateIcon({ focused }: { focused: boolean }) {
    return focused ? <NavAddActiveSVG /> : <NavAddSVG />;
}

function MenuIcon({ focused }: { focused: boolean }) {
    return focused ? <NavMenuActiveSVG /> : <NavMenuSVG />;
}

function BottomNavigation(props: Props) {
    const uploadIcon = useCallback(
        (p: ImageProps) => (
            <UploadIcon focused={p.focused} uploadItemsCount={props.uploadItemsCount} />
        ),
        [props.uploadItemsCount]
    );
    const createIcon = useCallback((p: ImageProps) => <CreateIcon focused={p.focused} />, []);
    const menuIcon = useCallback((p: ImageProps) => <MenuIcon focused={p.focused} />, []);

    return (
        <BottomTab.Navigator initialRouteName="Create tab">
            <BottomTab.Screen
                name="Upload queue tab"
                component={PendingItemsNavigator}
                options={{
                    ...tabOptions,
                    tabBarLabel: t`Upload queue`,
                    headerShown: false,
                    tabBarIcon: uploadIcon,
                    tabBarAccessibilityLabel: t`Upload queue page`
                }}
            />
            <BottomTab.Screen
                name="Create tab"
                component={CreateNavigator}
                options={{
                    ...tabOptions,
                    headerShown: false,
                    tabBarIcon: createIcon,
                    tabBarAccessibilityLabel: t`Add an item`
                }}
            />
            <BottomTab.Screen
                name="Menu tab"
                component={MenuNavigator}
                options={{
                    ...tabOptions,
                    headerShown: false,
                    tabBarIcon: menuIcon,
                    tabBarAccessibilityLabel: t`Menu`
                }}
            />
        </BottomTab.Navigator>
    );
}

export default BottomNavigation;
