import React from 'react';
import {Button, StyleSheet, View as SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import {useDispatch} from 'react-redux';
import {signOutAsync} from '../../utils/authHelperFunctions';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 10,
    paddingHorizontal: 10
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
});

const DrawerContainer = (props: Props) => {
  const dispatch = useDispatch();
  const {navigation} = props;
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <DrawerItems {...props} />
        <Button
          title="Logout"
          onPress={() => signOutAsync(navigation, dispatch)}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default DrawerContainer;
