import type { AppProps } from 'next/app';
import { Provider as URQLProvider, createClient } from 'urql';
import { ColorModeProvider, ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';

const client = createClient({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <URQLProvider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </URQLProvider>
  );
};

export default MyApp;
