import { Box, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import EditDeletePostBtns from '../../components/EditDeletePostBtns/EditDeletePostBtns';
import Layout from '../../components/Layout/Layout';
import { useGetPostFromUrl } from '../../hooks/useGetPostFromUrl';
import { withApollo } from '../../utils/withApollo';

const PostPage = () => {
  const { data, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Loading post - Letit</title>
        </Head>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Head>
          <title>Post not found - Letit</title>
        </Head>
        <Box>Could not find this post!</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{data.post.title} - Letit</title>
      </Head>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.content}</Box>
      <EditDeletePostBtns id={data.post.id} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(PostPage);
