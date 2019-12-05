import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import configureStore from './store/store';
import SiteCheckScreen from './screens/SiteCheckScreen/SiteCheckScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import PendingScreen from './screens/PendingScreen/PendingScreen';
import AddScreen from './screens/AddScreen/AddScreen';
import DetailsScreen from './screens/DetailsScreen/DetailsScreen';

const AppNavigator = createStackNavigator({
  Home: SiteCheckScreen,
  Login: LoginScreen,
  Profile: ProfileScreen,
  Add: AddScreen,
  PendingScreen: PendingScreen,
  Details: DetailsScreen
});

const store = configureStore();

const Navigation = createAppContainer(AppNavigator);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
