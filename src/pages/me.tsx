import NextLink from 'next/link';
import { Box, Button, Heading, Input, Text, Stack, Flex, Link } from '@chakra-ui/react';
import { NextPage } from 'next';
import { toast } from 'react-hot-toast';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
  FullUserDocument,
  FullUserQuery,
  useFullUserQuery,
  useUpdateUserMutation,
  usePostsQuery,
} from '../generated/graphql';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { withApollo } from '../utils/withApollo';
import Votes from '../components/Votes/Votes';
import EditDeletePostBtns from '../components/EditDeletePostBtns/EditDeletePostBtns';

const Me: NextPage<{}> = () => {
  const { data: meData } = useFullUserQuery();
  const {
    data: userPostsData,
    fetchMore,
    variables,
    loading,
  } = usePostsQuery({
    variables: { limit: 15, cursor: undefined, username: meData?.me?.username },
    notifyOnNetworkStatusChange: true,
  });
  const [email, setEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  useIsAuthenticated();

  useEffect(() => {
    if (meData) {
      setEmail(meData.me?.email as string);
    }
  }, [meData]);

  console.log(userPostsData);

  const __isTest__ = meData?.me?.email === process.env.NEXT_PUBLIC_TEST_EMAIL!;
  const handleLoadMore = () => {
    fetchMore({
      variables: {
        limit: variables?.limit,
        cursor: userPostsData?.posts.posts[userPostsData.posts.posts.length - 1].createdAt,
      },
    });
  };

  const onEdit = async () => {
    if (isEditing && email !== meData?.me?.email) {
      const response = await updateUser({
        variables: {
          data: { email },
        },
        update: (cache, { data }) => {
          cache.writeQuery<FullUserQuery>({
            query: FullUserDocument,
            data: {
              __typename: 'Query',
              me: data?.updateUser.user,
            },
          });
        },
      });

      if (response.data?.updateUser.errors) {
        const errors = response.data.updateUser.errors;
        errors.forEach((err) => {
          toast.error(err.message);
        });
      }

      if (response.data?.updateUser.user) {
        toast.success('Updated successfully!');
      }
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <Layout>
      <Head>
        <title>{meData?.me?.username}&apos;s Profile</title>
      </Head>
      <Box>
        <Heading as="h2">My Profile</Heading>
        <Heading as="h3" fontSize="lg" mt={8} mb={4}>
          Personal Details
        </Heading>
        <Box w={450}>
          <label htmlFor="me-form-email">Email:</label>
          <Input
            type="email"
            value={email}
            id="me-form-email"
            disabled={!isEditing}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          {__isTest__ && (
            <Text mt={2} color="tomato">
              Test account email can&apos;t be edited!
            </Text>
          )}
        </Box>
        <Button
          backgroundColor="tomato"
          _hover={{ backgroundColor: 'orangered' }}
          color="white"
          mt={6}
          disabled={__isTest__}
          onClick={onEdit}
        >
          {!isEditing ? 'Edit' : 'Update'}
        </Button>
      </Box>
      <Box>
        <Heading as="h3" fontSize="lg" mt={8} mb={4}>
          My Posts
        </Heading>
        <Stack spacing={8}>
          {userPostsData &&
            userPostsData.posts.posts.map((post) =>
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
        {userPostsData && userPostsData.posts.hasMore ? (
          <Button onClick={handleLoadMore} isLoading={loading} colorScheme="red" m="auto" my={8}>
            Load More
          </Button>
        ) : null}
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Me);
