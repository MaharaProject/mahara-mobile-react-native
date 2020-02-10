import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/variables';

const PreferencesScreen = (props: any) => (
  <View>
    <Text>Hi</Text>
  </View>
);

PreferencesScreen.navigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTitle: 'Pending items'
});

export default PreferencesScreen;
