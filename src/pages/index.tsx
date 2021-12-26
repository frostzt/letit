import Head from 'next/head';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';

import NavBar from '../components/NavBar/NavBar';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Letit - Let it out!</title>
      </Head>
      <NavBar />
      <Box>Hello there</Box>
    </Fragment>
  );
};

export default Home;
