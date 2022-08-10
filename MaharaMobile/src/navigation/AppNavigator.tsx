import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
// import MaharaMobileNavigator from './MaharaMobileNavigator';
// import { AuthNavigator } from './StackNavigators';
import { RootState } from '../store/reducers/rootReducer';
import MaharaMobileNavigator from './MaharaMobileNavigator';
import { AuthNavigator } from './StackNavigators';

function AppNavigator() {
  const isAuth = useSelector((state: RootState) => !!state.domainData.loginInfo.token);

  const didTryAutoLogin = useSelector(
    (state: RootState) => !!state.domainData.loginInfo.didTryAutoLogin
  );

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF' // react-nav default background is grey
    }
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {isAuth && <MaharaMobileNavigator />}
      {/* <MaharaMobileNavigator /> */}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <AuthLoadingScreen />}
    </NavigationContainer>
  );
}

export default AppNavigator;
