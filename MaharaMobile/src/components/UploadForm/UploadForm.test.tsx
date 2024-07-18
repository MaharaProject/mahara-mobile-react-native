import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from 'test-utils';
import UploadForm from './UploadForm';

it('renders correctly', () => {
  const props = {
    userTags: [],
    itemType: '',
    token: '',
    url: '',
    navigation: {
      navigate: () => {
        // do nothing
      }
    },
    defFolderTitle: '',
    defaultBlogTitle: '',
    userFolders: [],
    userBlogs: []
  };

  // create any initial state needed
  const initialState = {};
  // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore();

  render(
    <Provider store={mockStore(initialState)}>
      <UploadForm {...props} />
    </Provider>
  );
});
