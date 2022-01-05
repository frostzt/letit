import { useApolloClient } from '@apollo/client';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
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
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>{' '}
      </Fragment>
    );
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            Create Post
          </Button>
        </NextLink>
        <Box mr={3}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={9999} position="sticky" top={0} bg="tomato" p={4}>
      <Flex flex={1} maxW={800} margin="auto" align="center">
        <NextLink href="/">
          <Link>
            <Heading color="white">Letit</Heading>
          </Link>
        </NextLink>
        <Box color="white" ml="auto">
          {body}
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
