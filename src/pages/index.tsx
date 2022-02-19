import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import EditDeletePostBtns from '../components/EditDeletePostBtns/EditDeletePostBtns';
import Layout from '../components/Layout/Layout';
import Votes from '../components/Votes/Votes';
import { useMeQuery, usePostsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Home: NextPage = () => {
  const { data: meData } = useMeQuery();
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: { limit: 15, cursor: undefined },
    notifyOnNetworkStatusChange: true,
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: { limit: variables?.limit, cursor: data?.posts.posts[data.posts.posts.length - 1].createdAt },
    });
  };

  if (error) {
    toast.error(error.message);
  }

  if (!loading && !data) {
    return (
      <Layout>
        <Head>
          <title>Letit - Let it out!</title>
        </Head>
        <Box>Something broke! Please try again!</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Letit - Let it out!</title>
      </Head>
      {loading && <div>loading ...</div>}
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
                    {meData?.me?.id === post.creator.id && <EditDeletePostBtns id={post.id} />}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button onClick={handleLoadMore} isLoading={loading} colorScheme="red" m="auto" my={8}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
