import { MarkdownComponents } from '../../components/MDXComponents/MDXComponents';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import React from 'react';
import EditDeletePostBtns from '../../components/CoupledComponents/EditDeletePostBtns';
import Layout from '../../components/Layout/Layout';
import remarkGfm from 'remark-gfm';
import { useMeQuery } from '../../generated/graphql';
import { useGetPostFromUrl } from '../../hooks/useGetPostFromUrl';
import { withApollo } from '../../utils/withApollo';
import Votes from '../../components/CoupledComponents/Votes';

const PostPage = () => {
  const { data: meData } = useMeQuery();
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
        <div>Could not find this post!</div>
      </Layout>
    );
  }

  const renderedPost = {
    ...data.post,
    contentSnippet: '',
  };

  return (
    <Layout>
      <Head>
        <title>{data.post.title} - Letit</title>
      </Head>
      <div className="flex">
        <Votes post={renderedPost} />
        <div className="ml-5">
          <h2 className="mb-4 font-bold text-xl inline-block">{data.post.title}</h2>
          <div className="mb-4">
            <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
              {data.post.content}
            </ReactMarkdown>
          </div>
          {data.post.creator.id === meData?.me?.id && <EditDeletePostBtns id={data.post.id} />}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(PostPage);
