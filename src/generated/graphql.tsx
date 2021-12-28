import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  changePassword?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<PropertyError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: BooleanResponse;
  createPost: PostResponse;
  deletePost: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type MutationCreatePostArgs = {
  data: PostInput;
};

export type MutationDeletePostArgs = {
  id: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type MutationRegisterArgs = {
  data: UsernamePasswordInput;
};

export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  creatorId: Scalars['String'];
  id: Scalars['String'];
  points: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<PropertyError>>;
  post?: Maybe<Post>;
};

export type PropertyError = {
  __typename?: 'PropertyError';
  message: Scalars['String'];
  property?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};

export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<PropertyError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type NormalErrorFragment = {
  __typename?: 'PropertyError';
  message: string;
  property?: string | null | undefined;
};

export type NormalUserFragment = { __typename?: 'User'; id: string; username: string };

export type NormalUserResponseFragment = {
  __typename?: 'UserResponse';
  user?: { __typename?: 'User'; id: string; username: string } | null | undefined;
  errors?:
    | Array<{ __typename?: 'PropertyError'; message: string; property?: string | null | undefined }>
    | null
    | undefined;
};

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: {
    __typename?: 'BooleanResponse';
    changePassword?: boolean | null | undefined;
    errors?:
      | Array<{ __typename?: 'PropertyError'; message: string; property?: string | null | undefined }>
      | null
      | undefined;
  };
};

export type CreatePostMutationVariables = Exact<{
  data: PostInput;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: {
    __typename?: 'PostResponse';
    post?:
      | { __typename?: 'Post'; id: string; title: string; content: string; updatedAt: string; createdAt: string }
      | null
      | undefined;
    errors?:
      | Array<{ __typename?: 'PropertyError'; message: string; property?: string | null | undefined }>
      | null
      | undefined;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    user?: { __typename?: 'User'; id: string; username: string } | null | undefined;
    errors?:
      | Array<{ __typename?: 'PropertyError'; message: string; property?: string | null | undefined }>
      | null
      | undefined;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    user?: { __typename?: 'User'; id: string; username: string } | null | undefined;
    errors?:
      | Array<{ __typename?: 'PropertyError'; message: string; property?: string | null | undefined }>
      | null
      | undefined;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; id: string; username: string } | null | undefined;
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
  __typename?: 'Query';
  posts: Array<{
    __typename?: 'Post';
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export const NormalUserFragmentDoc = gql`
  fragment NormalUser on User {
    id
    username
  }
`;
export const NormalErrorFragmentDoc = gql`
  fragment NormalError on PropertyError {
    message
    property
  }
`;
export const NormalUserResponseFragmentDoc = gql`
  fragment NormalUserResponse on UserResponse {
    user {
      ...NormalUser
    }
    errors {
      ...NormalError
    }
  }
  ${NormalUserFragmentDoc}
  ${NormalErrorFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($newPassword: String!, $token: String!) {
    changePassword(newPassword: $newPassword, token: $token) {
      changePassword
      errors {
        ...NormalError
      }
    }
  }
  ${NormalErrorFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
}
export const CreatePostDocument = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      post {
        id
        title
        content
        updatedAt
        createdAt
      }
      errors {
        message
        property
      }
    }
  }
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...NormalUserResponse
    }
  }
  ${NormalUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
}
export const RegisterDocument = gql`
  mutation Register($data: UsernamePasswordInput!) {
    register(data: $data) {
      ...NormalUserResponse
    }
  }
  ${NormalUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
}
export const MeDocument = gql`
  query Me {
    me {
      ...NormalUser
    }
  }
  ${NormalUserFragmentDoc}
`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const PostsDocument = gql`
  query Posts {
    posts {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
