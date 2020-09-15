import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-device-info', () => ({
  getModel: jest.fn()
}));

jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation(x => ({...x, type: 'Navigation/PUSH'})),
      replace: jest
        .fn()
        .mockImplementation(x => ({...x, type: 'Navigation/REPLACE'})),
      reset: jest.fn()
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation(x => x)
    },
    getParam: jest.fn()
  };
});
