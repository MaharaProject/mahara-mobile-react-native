import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {LoginScreen} from './LoginScreen';

it('renders correctly', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({todos: []});

  const props = {
    url: '',
    dispatch: store.dispatch,
    route: {params: {loginType: ''}},
    tokenLogin: false,
    ssoLogin: false,
    localLogin: false,
    userFolders: [],
    userBlogs: [],
    loginType: 'local',
    i18n: jest.mock('', () => {}),
    isGuest: false,
    navigation: jest.mock('', () => {})
  };
  renderer.create(<LoginScreen {...props} />);
});
