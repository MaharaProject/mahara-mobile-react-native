import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthLoadingScreen from 'screens/AuthLoadingScreen/AuthLoadingScreen';
import { RootState } from 'store/reducers/rootReducer';
import BottomNavigation from './BottomNavigation';
import { AuthNavigator } from './StackNavigators';

function AppNavigator() {
  const isAuth = useSelector((state: RootState) => !!state.domainData.loginInfo.token);

  const didTryAutoLogin = useSelector(
    (state: RootState) => !!state.domainData.loginInfo.didTryAutoLogin
  );

  return (
    <NavigationContainer theme={DefaultTheme}>
      {isAuth && <BottomNavigation />}
      {/* <MaharaMobileNavigator /> */}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <AuthLoadingScreen />}
    </NavigationContainer>
  );
}

export default AppNavigator;
