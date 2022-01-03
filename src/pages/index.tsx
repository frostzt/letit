import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Votes from '../components/Votes/Votes';
import { useDeletePostMutation, usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home: NextPage = () => {
  const [variables, setVariables] = useState({ limit: 15, cursor: undefined as undefined | string });
  const [{ data, fetching }] = usePostsQuery({ variables });
  const [, deletePost] = useDeletePostMutation();

  const handleLoadMore = () => {
    setVariables({ limit: variables.limit, cursor: data?.posts.posts[data.posts.posts.length - 1].createdAt });
  };

  return (
    <Layout>
      <Head>
        <title>Letit - Let it out!</title>
      </Head>
      {fetching && <div>loading ...</div>}
      <Stack spacing={8}>
        {data &&
          data.posts.posts.map((post) =>
            !post ? null : (
              <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                <Votes post={post} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>Posted by {post.creator.username}</Text>
                  <Flex mt={4} align="center">
                    <Text>{post.contentSnippet}</Text>
                    <IconButton
                      onClick={() => {
                        deletePost({ id: post.id });
                      }}
                      colorScheme="blackAlpha"
                      ml="auto"
                      icon={<DeleteIcon />}
                      aria-label="Delete Post"
                    />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
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
