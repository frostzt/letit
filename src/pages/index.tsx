import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home: NextPage = () => {
  const [variables, setVariables] = useState({ limit: 15, cursor: undefined as undefined | string });
  const [{ data, fetching }] = usePostsQuery({ variables });

  const handleLoadMore = () => {
    setVariables({ limit: variables.limit, cursor: data?.posts.posts[data.posts.posts.length - 1].createdAt });
  };

  return (
    <Layout>
      <Head>
        <title>Letit - Let it out!</title>
      </Head>
      <Flex mb={4} align="center">
        <Heading>Letit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      {fetching && <div>loading ...</div>}
      <Stack spacing={8}>
        {data &&
          data.posts.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text>Posted by {post.creator.username}</Text>
              <Text mt={4}>{post.contentSnippet}</Text>
            </Box>
          ))}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button onClick={handleLoadMore} isLoading={fetching} colorScheme="red" m="auto" my={8}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
