import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import SelectMediaType from '../../components/SelectMediaType/SelectMediaType';

type Props = {
  i18n: I18n;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const SelectMediaScreen = (props: Props) => {
  const selectMediaType = (type: string) => {
    props.navigation.navigate({
      routeName: 'AddItem',
      params: {formType: type, title: props.i18n._(t`Add`)}
    });
  };

  return (
    <ScrollView>
      <View style={generic.wrap}>
        <SelectMediaType selectMediaType={selectMediaType} />
      </View>
    </ScrollView>
  );
};

SelectMediaScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: styles.colors.light
});

export default withI18n()(SelectMediaScreen);
