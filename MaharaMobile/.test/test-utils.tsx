import React from 'react';
import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, Image, Text } from '@gluestack-ui/themed-native-base';
import { I18nProvider } from '@lingui/react';
import { render } from '@testing-library/react-native';
import i18n, { changeActiveLanguage } from 'i18n';

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  changeActiveLanguage('en');
  return (
    <GluestackUIProvider config={config}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </GluestackUIProvider>
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
