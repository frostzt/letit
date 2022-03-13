import { InMemoryCache } from '@apollo/client';
import { PaginatedPosts } from '../generated/graphql';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          merge(existing: PaginatedPosts | undefined, incoming: PaginatedPosts): PaginatedPosts {
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
      },
    },
  },
});

export { cache };
