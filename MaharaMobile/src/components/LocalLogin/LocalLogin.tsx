import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconButton, Input, Stack } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { getManufacturer, getModel } from 'react-native-device-info';
import uuid from 'react-native-uuid';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';
import LogoView from 'components/LogoView/LogoView';
import MediumButton from 'components/UI/MediumButton/MediumButton';
import MediumButtonDark from 'components/UI/MediumButtonDark/MediumButtonDark';
import SubHeading from 'components/UI/SubHeading/SubHeading';
import SubHeadingNoColon from 'components/UI/SubHeadingNoColon/SubHeadingNoColon';
import { onCheckAuthJSON } from 'utils/authHelperFunctions';
import { LOG_IN_ICON } from 'utils/constants';

type Props = {
    url: string;
    onGetToken: (token: string | null) => void;
    isLoading: boolean;
};

const LocalLoginStyles = StyleSheet.create({
    input: {
        backgroundColor: styles.colors.light
    }
});

export default function LocalLogin(props: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = React.useState(false);

    const checkLoginForToken = async () => {
        const manufacturer = getManufacturer();
        const model = getModel();
        const id = uuid.v4();
        const url = `${props.url}module/mobileapi/json/token.php`;

        const body = new FormData();
        body.append('username', username.trim());
        body.append('password', password);
        body.append('service', 'maharamobile');
        body.append('component', 'module/mobileapi');
        body.append('clientname', 'Mahara Mobile');
        body.append('clientenv', `${Platform.OS}, ${manufacturer}, ${model}`);
        body.append('id', id);

        const config = {
            method: 'POST',
            body
        };

        try {
            const request = await fetch(url, config);
            const json = await request.json();

            onCheckAuthJSON(
                json,
                () => props.onGetToken(json.token),
                () => props.onGetToken(null)
            );
        } catch (e) {
            console.error(`Unexpected error:${e}`);
        }
        return null;
    };

    return (
        <LogoView>
            {props.isLoading ? (
                <ActivityIndicator size="small" color={styles.colors.light} />
            ) : null}

            <Stack direction="column" mb="2.5" mt="1.5" space={3}>
                <SubHeadingNoColon
                    style={{ color: styles.colors.light, textAlign: 'center' }}
                    text={t`Log in via username and password`}
                />
                <Stack space={4} w="100%" alignItems="center">
                    <Input
                        fontSize="md"
                        style={{ ...generic.regularText, ...LocalLoginStyles.input }}
                        placeholder={t`Username`}
                        autoCapitalize="none"
                        onChangeText={(usernameInput) => setUsername(usernameInput)}
                        variant="filled"
                        w={{
                            base: '100%',
                            md: '25%'
                        }}
                    />
                    <Input
                        fontSize="md"
                        style={{ ...LocalLoginStyles.input, ...generic.regularText }}
                        onChangeText={(passwordInput) => setPassword(passwordInput)}
                        variant="filled"
                        w={{
                            base: '100%',
                            md: '25%'
                        }}
                        type={show ? 'text' : 'password'}
                        InputRightElement={
                            <IconButton
                                h="full"
                                rounded="none"
                                backgroundColor={styles.colors.light2}
                                onPress={() => setShow(!show)}
                                icon={
                                    show ? (
                                        <FontAwesomeIcon
                                            color={styles.colors.primary}
                                            icon={faEye}
                                            size={styles.font.lg}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            color={styles.colors.primary}
                                            icon={faEyeSlash}
                                            size={styles.font.lg}
                                        />
                                    )
                                }
                            />
                        }
                        placeholder={t`Password`}
                    />
                </Stack>

                <MediumButtonDark text={t`Login`} icon={LOG_IN_ICON} onPress={checkLoginForToken} />
            </Stack>
        </LogoView>
    );
}
