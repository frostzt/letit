import { ApolloError } from '@apollo/client';

const selectGQLError = (error: ApolloError) => {
  const gqlError = error.graphQLErrors['0'].extensions.code;
  return gqlError;
};

export { selectGQLError };
