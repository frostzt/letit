import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import theme from '../theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: true }}>
        <Toaster containerStyle={{ marginTop: '100px' }} />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default MyApp;
