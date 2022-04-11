import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PostContentFragment, useGetPinnedPostsLazyQuery, useMeQuery, usePostsQuery } from '../generated/graphql';
import { cache } from '../utils/cache';
import { sortPostsByTop } from '../utils/sorting/postFilters';
import { withApollo } from '../utils/withApollo';
const Card = dynamic(() => import('../ui/Card'));
const Stack = dynamic(() => import('../ui/Stack'));
const Layout = dynamic(() => import('../components/Layout/Layout'));
const AuthBar = dynamic(() => import('../components/NavBar/AuthBar'), { ssr: false });

const Home: NextPage = () => {
  const [sortPostsBy, setSortPostsBy] = useState<'recent' | 'top' | 'pinned'>('recent');
  const [posts, setPosts] = useState<PostContentFragment[]>();
  const { data: meData } = useMeQuery();
  const [getPinnedPosts, { data: pinnedPosts, error: pinnedPostsErrored, variables: pinnedPostsVariables }] =
    useGetPinnedPostsLazyQuery({
      variables: { limit: 15, cursor: undefined },
    });
  const {
    data: allPosts,
    error,
    loading,
    fetchMore,
    variables,
  } = usePostsQuery({
    variables: { limit: 15, cursor: undefined },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (allPosts?.posts) {
      setPosts(allPosts.posts.posts);
    }
  }, [allPosts]);

  useEffect(() => {
    cache.evict({
      id: 'ROOT_QUERY',
      fieldName: 'posts:{}',
    });
    cache.gc();
  }, []);

  const handleLoadMore = () => {
    fetchMore({
      variables: { limit: variables?.limit, cursor: allPosts?.posts.posts[allPosts.posts.posts.length - 1].createdAt },
    });
  };

  const handleLoadMorePinnedPosts = () => {
    fetchMore({
      variables: {
        limit: pinnedPostsVariables?.limit,
        cursor: pinnedPosts?.posts.posts[pinnedPosts.posts.posts.length - 1].createdAt,
      },
    });
  };

  const handleSortTop = () => {
    setSortPostsBy('top');
    if (posts) {
      const sortedPosts = sortPostsByTop(posts);
      setPosts(sortedPosts);
    }
  };

  const handleSortRecent = () => {
    setSortPostsBy('recent');
    if (allPosts?.posts) {
      setPosts(allPosts.posts.posts);
    }
  };

  const handleSortPinned = async () => {
    setSortPostsBy('pinned');
    await getPinnedPosts();
    if (pinnedPosts?.posts) {
      setPosts(pinnedPosts.posts.posts);
    } else {
      setPosts(undefined);
    }
  };

  if (error) {
    toast.error(error.message);
  }

  if (!loading && !allPosts) {
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
      <div className="flex mb-3 lg:mb-5 hd:mb-7 text-sm justify-between items-center">
        <div className="flex">
          <div className="mr-3">
            <p
              onClick={handleSortRecent}
              className={`${
                sortPostsBy === 'recent' ? 'text-indigo-500 border-b border-indigo-500' : 'text-zinc-600'
              } cursor-pointer`}
            >
              Recent
            </p>
          </div>
          <div className="mr-3">
            <p
              onClick={handleSortTop}
              className={`${
                sortPostsBy === 'top' ? 'text-indigo-500 border-b border-indigo-500' : 'text-zinc-600'
              } cursor-pointer`}
            >
              Top
            </p>
          </div>
          <div>
            <p
              onClick={handleSortPinned}
              className={`${
                sortPostsBy === 'pinned' ? 'text-indigo-500 border-b border-indigo-500' : 'text-zinc-600'
              } cursor-pointer`}
            >
              Pinned
            </p>
          </div>
        </div>
        <AuthBar />
      </div>
      <Stack>{posts && posts.map((post) => (!post ? null : <Card key={post.id} post={post} meData={meData} />))}</Stack>
      {allPosts && allPosts.posts.hasMore ? (
        <div className="flex">
          <button
            onClick={sortPostsBy !== 'pinned' ? handleLoadMore : handleLoadMorePinnedPosts}
            className="my-8 m-auto bg-rose-600"
          >
            load more
          </button>
        </div>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Home);
