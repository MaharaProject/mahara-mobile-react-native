import 'react-native';
import React from "react";
import { Provider } from 'react-redux';
import { I18nProvider } from '@lingui/react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { i18n } from '../../i18n';
import UploadForm from './UploadForm';

it('renders correctly', () => {
  let props = {
    userTags: [],
    formType: '',
    token: '',
    url: '',
    navigation: {navigate: () => {}},
    defaultFolderTitle: '',
    defaultBlogId: 0,
    userFolders: [],
    userBlogs: []
  };


  // create any initial state needed
  const initialState = {};
  // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore();

  renderer.create(
    <Provider store={mockStore(initialState)}>
      <I18nProvider i18n={i18n} language="en">
        <UploadForm {...props} />
      </I18nProvider>
    </Provider>);
});
