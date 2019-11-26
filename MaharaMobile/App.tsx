import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import configureStore from './store/store';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import PendingScreen from './screens/PendingScreen/PendingScreen';
import AddScreen from './screens/AddScreen/AddScreen';
import { MaharaStore } from './models/models';
import DetailsScreen from './screens/DetailsScreen/DetailsScreen';

const MaharaNavigator = createStackNavigator({
  Home: LoginScreen,
  Profile: ProfileScreen,
  Add: AddScreen,
  PendingScreen: PendingScreen,
  FileDetails: DetailsScreen
});

// const PendingNavigator = createStackNavigator({

// })

const Navigation = createAppContainer(MaharaNavigator);

const store = configureStore();

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
