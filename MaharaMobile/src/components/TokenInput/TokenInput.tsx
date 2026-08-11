import React, { useState } from 'react';
import { Input, Stack } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import { ActivityIndicator, StyleSheet } from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
// Images
import { LOG_IN_ICON } from '../../utils/constants';
import LogoView from '../LogoView/LogoView';
import MediumButton from '../UI/MediumButton/MediumButton';
import MediumButtonDark from '../UI/MediumButtonDark/MediumButtonDark';
import SubHeading from '../UI/SubHeading/SubHeading';
import SubHeadingNoColon from '../UI/SubHeadingNoColon/SubHeadingNoColon';

// Styles
// import styles from './TokenInput.style';

type Props = {
    onGetToken: (token: string) => void;
    isLoading: boolean;
};

const TokenLoginStyles = StyleSheet.create({
    input: {
        backgroundColor: styles.colors.light
    }
});

export default function TokenInput(props: Props) {
    const [token, setToken] = useState('');

    return (
        <LogoView>
            {props.isLoading ? (
                <ActivityIndicator size="small" color={styles.colors.light} />
            ) : null}

            <Stack direction="column" mb="2.5" mt="1.5" space={3}>
                <SubHeadingNoColon
                    style={{ color: styles.colors.light, textAlign: 'center' }}
                    text=" Log in via an access token"
                />
                <Input
                    placeholder=""
                    height={styles.heights.input}
                    autoCapitalize="none"
                    onChangeText={(input) => setToken(input.trim())}
                    style={{ ...generic.regularText, ...TokenLoginStyles.input }}
                    variant="filled"
                    w={{
                        base: '100%',
                        md: '25%'
                    }}
                />
                <MediumButtonDark
                    text={t`Verify token`}
                    icon={LOG_IN_ICON}
                    onPress={() => props.onGetToken(token)}
                />
            </Stack>
        </LogoView>
    );
}
