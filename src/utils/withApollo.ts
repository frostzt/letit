import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import createWithApollo from './createWithApollo';
import { cache } from './cache';

const createWithClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API as string,
    headers: {
      cookie: (typeof window === 'undefined' ? ctx?.req?.headers?.cookie : undefined) || '',
    },
    credentials: 'include',
    cache,
  });

// @ts-expect-error acp is of type function which is supported however ts suggests to call it
export const withApollo = createWithApollo(createWithClient);
