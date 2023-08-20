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

  const uploadItemsCount = useSelector(
    (state: RootState) =>
      state.appState.uploadFiles.uploadFilesIds.length +
      state.appState.uploadJEntries.uploadJEntriesIds.length
  );

  return (
    <NavigationContainer theme={DefaultTheme}>
      {isAuth && <BottomNavigation uploadItemsCount={uploadItemsCount} />}
      {/* <MaharaMobileNavigator /> */}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <AuthLoadingScreen />}
    </NavigationContainer>
  );
}

export default AppNavigator;
