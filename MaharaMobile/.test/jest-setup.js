import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-device-info', () => ({ getModel: jest.fn() }));
jest.mock('react-native-blob-util', () => ({
    fs: { dirs: { CacheDir: './' }, unlink: jest.fn() },
    config: () => ({ fetch: jest.fn() })
}));
jest.mock('react-native-localize', () => ({ getLocales: jest.fn() }));

// Fake timers using Jest
beforeEach(() => {
    jest.useFakeTimers();
});
// Running all pending timers and switching to real timers using Jest
afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});
