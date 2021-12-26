import Head from 'next/head';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { withUrqlClient } from 'next-urql';

import NavBar from '../components/NavBar/NavBar';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const [{ data, fetching }] = usePostsQuery();

  return (
    <Fragment>
      <Head>
        <title>Letit - Let it out!</title>
      </Head>
      <NavBar />
      <Box>{data && data.posts.map((post) => <div key={post.id}>{post.title}</div>)}</Box>
    </Fragment>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
