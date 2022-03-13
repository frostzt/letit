import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EditDeletePostBtns from '../components/EditDeletePostBtns/EditDeletePostBtns';
import Layout from '../components/Layout/Layout';
import { MarkdownComponents } from '../components/MDXComponents/MDXComponents';
import Votes from '../components/Votes/Votes';
import { useMeQuery, usePostsQuery } from '../generated/graphql';
import Card from '../ui/Card';
import Stack from '../ui/Stack';
import { cache } from '../utils/cache';
import { withApollo } from '../utils/withApollo';

const Home: NextPage = () => {
  const { data: meData } = useMeQuery();
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: { limit: 15, cursor: undefined },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    cache.evict({
      id: 'ROOT_QUERY',
      fieldName: 'posts:{}',
    });
    cache.gc();
  }, []);

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
        <div>Something broke! Please try again!</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Letit - Let it out!</title>
      </Head>
      {loading && <div>loading ...</div>}
      <Stack>
        {data && data.posts.posts.map((post) => (!post ? null : <Card key={post.id} post={post} meData={meData} />))}
      </Stack>
      {data && data.posts.hasMore ? (
        <div className="flex">
          <button onClick={handleLoadMore} className="my-8 m-auto bg-rose-600">
            load more
          </button>
        </div>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
