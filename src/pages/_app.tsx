import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider, ChakraProvider } from '@chakra-ui/react';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { Provider as URQLProvider, createClient, dedupExchange, fetchExchange } from 'urql';

import theme from '../theme';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';

function updateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(queryInput, (data) => fn(result, data as any) as any);
}

const urqlClient = createClient({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            updateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }));
          },
          login: (_result, _args, cache, _info) => {
            updateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
              if (result.login.errors) {
                return query;
              } else {
                return {
                  me: result.login.user,
                };
              }
            });
          },
          register: (_result, _args, cache, _info) => {
            updateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
              if (result.register.errors) {
                return query;
              } else {
                return {
                  me: result.register.user,
                };
              }
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <URQLProvider value={urqlClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Toaster />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </URQLProvider>
  );
};

export default MyApp;
