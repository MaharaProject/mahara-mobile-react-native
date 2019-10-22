/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// import { LoginScreen } from '../screens/LoginScreen/LoginScreen.tsx';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('rn-fetch-blob', () => {
  return true
});
jest.mock('react-navigation-stack', () => {
  return ({
    createStackNavigator : jest.fn(() => { return true })
  })
});
jest.mock('react-native-gesture-handler', () => 'anything');
jest.mock('react-navigation-stack', () => 'anything');
// jest.mock('react-redux', () => {
//   return ({
//     connect: jest.fn(() => {
//       return true
//     })
//   })
// });
// jest.mock('react-native', () => {
//   const items = {
//     'items': `{"key":"value"}`,
//   };
//   return ({
//     AsyncStorage: {
//       setItem: jest.fn((item, value) => {
//         return new Promise((resolve, reject) => {
//       items[item] = value;
//           resolve(value);
//         });
//       }),
//       multiSet:  jest.fn((item, value) => {
//         return new Promise((resolve, reject) => {
//       items[item] = value;
//           resolve(value);
//         });
//       }),
//       getItem: jest.fn((item, value) => {
//         return new Promise((resolve, reject) => {
//           resolve(items[item]);
//         });
//       }),
//       multiGet: jest.fn((item) => {
//         return new Promise((resolve, reject) => {
//           resolve(items[item]);
//         });
//       }),
//       removeItem: jest.fn((item) => {
//         return new Promise((resolve, reject) => {
//           resolve(delete items[item]);
//         });
//       }),
//       getAllKeys: jest.fn((items) => {
//         return new Promise((resolve) => {
//           resolve(items.keys());
//         });
//       })
//     },
//     NativeModules: {
//       RNDocumentPicker: () => {}
//     },
//     Dimensions: {
//       get: jest.fn(() => ({
//         width: 0,
//         height: 0,
//       }))
//     },
//     Platform: {
//       OS: jest.fn(() => 'android'),
//       version: jest.fn(() => 25),
//     },
//     Easing: {
//       bezier: () => {},
//     },
//     View: () => 'View',
//     ViewPropTypes: ({
//       propTypes: {
//         style: {}
//       },
//     }),
//     Text: ({
//       propTypes: {
//         style: {}
//       },
//     }),
//     TouchableNativeFeedback: () => 'TouchableNativeFeedback',
//     TouchableOpacity: () => 'TouchableOpacity',
//     StyleSheet: {
//       create: () => ({})
//     },
//     Animated: {
//       createAnimatedComponent: () => {}
//     },
//     requireNativeComponent: () => {}
//   });
// });


it('renders correctly', () => {
  renderer.create(<App />);
});
// const createTestProps = (props?: object) => ({
//   ...props
// });
//
// describe("App", () => {
//   const props = createTestProps();
//   const { getByText } = render(<App {...props} />);
//
//   it("should render a welcome", () => {
//     expect(getByText(/welcome/i)).toBeDefined();
//   });
// });
