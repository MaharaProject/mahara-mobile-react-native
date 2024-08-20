import { useEffect } from 'react';
import { t } from '@lingui/macro';
import { useNavigation } from '@react-navigation/core';
import { Alert } from 'react-native';

const onCancelAlert = (goBack: () => void) => {
    Alert.alert(
        t`Are you sure?`,
        t`It looks like you have been editing something. If you leave before saving, your changes will be lost.`,
        [{ text: t`Cancel` }, { text: t`Okay`, onPress: () => goBack() }],
        { cancelable: true }
    );
};

export function useChangeNavigationWarning(hasUnsavedChanges: boolean) {
    const navigation = useNavigation();

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!hasUnsavedChanges || e.data.action.payload?.params?.saving) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }
                // Prevent default behavior of leaving the screen
                e.preventDefault();
                // Prompt the user before leaving the screen
                onCancelAlert(() => navigation.dispatch(e.data.action));
            }),
        [hasUnsavedChanges, navigation]
    );
}
