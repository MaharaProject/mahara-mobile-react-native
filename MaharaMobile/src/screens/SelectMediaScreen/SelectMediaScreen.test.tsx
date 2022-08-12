import React from 'react';
import { render } from 'test-utils';
import SelectMediaScreen from './SelectMediaScreen';

it('renders correctly', () => {
  const props = {
    navigation: {
      navigate: () => {
        // do nothing
      }
    }
  };

  render(<SelectMediaScreen {...props} />);
});
