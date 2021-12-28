import { Box, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import Layout from '../components/Layout/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      <Head>
        <title>Letit - Let it out!</title>
      </Head>
      <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink>
      <Box>{data && data.posts.map((post) => <div key={post.id}>{post.title}</div>)}</Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
