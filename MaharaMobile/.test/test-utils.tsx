import React from 'react';
import { I18nProvider } from '@lingui/react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import i18n, { changeActiveLanguage } from 'i18n';

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  changeActiveLanguage('en');
  return (
    <NativeBaseProvider>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </NativeBaseProvider>
  );
};

type Options = {
  wrapper?: React.ComponentType<any>;
  createNodeMock?: (element: React.ReactElement) => any;
};

const customRender = (ui: React.ReactElement, options?: Options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
