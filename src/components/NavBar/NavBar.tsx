import NextLink from 'next/link';
import React, { Fragment } from 'react';
import { Box, Flex, Link, Button } from '@chakra-ui/react';

import { useLogoutMutation, useMeQuery } from '../../generated/graphql';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [{ data, fetching }] = useMeQuery();
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
      <Flex>
        <Box mr={3}>{data.me.username}</Box>
        <Button onClick={() => logout()} isLoading={logoutFetching} variant="link">
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box color="white" ml="auto">
        {body}
      </Box>
    </Flex>
  );
};

export default NavBar;
