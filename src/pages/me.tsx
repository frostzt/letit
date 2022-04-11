import { InboxIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FullUserDocument,
  FullUserQuery,
  useFullUserQuery,
  usePostsByUserLazyQuery,
  useUpdateUserMutation,
} from '../generated/graphql';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import Card from '../ui/Card';
import { cache } from '../utils/cache';
import { withApollo } from '../utils/withApollo';
const AuthBar = dynamic(() => import('../components/NavBar/AuthBar'), { ssr: false });
const Layout = dynamic(() => import('../components/Layout/Layout'));
const InputField = dynamic(() => import('../ui/InputField'));
const Stack = dynamic(() => import('../ui/Stack'));

const Me: NextPage<{}> = () => {
  const { data: meData } = useFullUserQuery();
  const [getPostsForUser, { data: userPostsData, variables, fetchMore, loading }] = usePostsByUserLazyQuery({
    variables: { limit: 15, cursor: undefined, username: meData?.me?.username },
    notifyOnNetworkStatusChange: true,
  });
  const [email, setEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  useIsAuthenticated();

  useEffect(() => {
    cache.evict({
      id: 'ROOT_QUERY',
      fieldName: 'posts:{}',
    });
    cache.gc();
  }, []);

  useEffect(() => {
    if (meData) {
      setEmail(meData.me?.email as string);
      getPostsForUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData]);

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
      <div>
        <div className="flex justify-between items-center">
          <h2>My Profile</h2>
          <AuthBar />
        </div>
        <h3 className="text-lg font-bold">Personal Details</h3>
        <div className="mt-3">
          <InputField
            value={email}
            type="email"
            Icon={InboxIcon}
            label="Email"
            htmlFor="me-form-email"
            disabled={!isEditing}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          {__isTest__ && <p className="text-rose-500 mt-2">Test account&apos;s email can&apos;t be edited!</p>}
        </div>
        <button
          disabled={__isTest__}
          onClick={onEdit}
          className="bg-indigo-500 text-white text-sm py-1.5 px-5 rounded-sm shadow-lg shadow-indigo-500/50 mt-3"
        >
          {!isEditing ? 'Edit' : 'Update'}
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-3">My Posts</h3>
        <Stack>
          {userPostsData &&
            userPostsData.posts.posts.map((post) =>
              !post ? null : <Card key={post.id} post={post} meData={meData} />
            )}
        </Stack>
        {userPostsData && userPostsData.posts.hasMore ? (
          <button
            onClick={handleLoadMore}
            className="bg-indigo-500 text-white text-sm py-1.5 px-5 rounded-sm shadow-lg shadow-indigo-500/50 mt-3"
          >
            Load More
          </button>
        ) : null}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Me);
