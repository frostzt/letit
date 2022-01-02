import NextLink from 'next/link';
import React, { Fragment } from 'react';
import { Box, Flex, Link, Button, Heading } from '@chakra-ui/react';

import { isServer } from '../../utils/isServer';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;
  if (fetching) {
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
        <Button onClick={() => logout()} isLoading={logoutFetching} variant="link">
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position="sticky" top={0} bg="tomato" p={4}>
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
