import { useApolloClient } from '@apollo/client';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { Fragment } from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const NavBar: React.FC<{}> = () => {
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({ skip: isServer() });
  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  let body = null;
  if (loading) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Fragment>
        <NextLink href="/login">
          <div className="mr-2 cursor-pointer">Login</div>
        </NextLink>
        <NextLink href="/register">
          <div className="cursor-pointer">Register</div>
        </NextLink>{' '}
      </Fragment>
    );
  } else {
    body = (
      <div className="flex text-center">
        <NextLink href="/create-post">
          <button className="mr-4">Create Post</button>
        </NextLink>
        <NextLink href="/me">
          <div className="cursor-pointer mr-3">{data.me.username}</div>
        </NextLink>
        <button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex p-1 top-0 w-1/6 h-screen z-50 bg-zinc-900 fixed">
      <div className="mx-auto">
        <NextLink href="/">
          <div className="flex justify-center ml-1 mt-2 md:mt-5 items-center">
            <div className="relative h-10 w-10 md:h-12 md:w-12 lg:w-20 lg:h-20">
              <Image src="/icon.svg" alt="Letit" layout="fill" />
            </div>
          </div>
        </NextLink>
      </div>
      {/* <div className="white ml-auto">{body}</div> */}
    </div>
  );
};

export default NavBar;
