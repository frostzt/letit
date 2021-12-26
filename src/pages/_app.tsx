import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider, ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: true }}>
        <Toaster />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default MyApp;
