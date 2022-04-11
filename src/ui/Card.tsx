import { ApolloCache } from '@apollo/client';
import { gql } from 'graphql-tag';
import { BookmarkIcon as NotBookmarked } from '@heroicons/react/outline';
import { BookmarkIcon as Bookmarked } from '@heroicons/react/solid';
import NextLink from 'next/link';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EditDeletePostBtns from '../components/CoupledComponents/EditDeletePostBtns';
import Votes from '../components/CoupledComponents/Votes';
import { MarkdownComponents } from '../components/MDXComponents/MDXComponents';
import { CreateBookmarkMutation, MeQuery, PostContentFragment, useCreateBookmarkMutation } from '../generated/graphql';

interface CardProps {
  post: PostContentFragment;
  meData: MeQuery | undefined;
}

const updateAfterPost = (value: boolean, postId: string, cache: ApolloCache<CreateBookmarkMutation>) => {
  const data = cache.readFragment<{ id: string; bookmarked: boolean }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment _ on Post {
        id
        bookmarked
      }
    `,
  });

  if (data) {
    if (data.bookmarked === value) {
      return;
    }

    cache.writeFragment({
      id: 'Post:' + postId,
      fragment: gql`
        fragment __ on Post {
          bookmarked
        }
      `,
      data: { bookmarked: value },
    });
  }
};

const Card: React.FC<CardProps> = ({ post, meData }) => {
  const [createBookmark, { data, error }] = useCreateBookmarkMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    if (data?.createBookmark.errors) {
      data.createBookmark.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
  }, [data, error]);

  return (
    <div
      key={post.id}
      className="flex flex-col bg-white p-5 shadow-lg shadow-zinc-300/50 border-1 mb-4 md:mb-8 rounded-md hd:p-8"
    >
      <div className="flex">
        <Votes post={post} />
        <div className="flex flex-col">
          <NextLink href="/post/[id]" as={`/post/${post.id}`}>
            <h2 className="text-lg font-bold cursor-pointer">{post.title}</h2>
          </NextLink>
          <p className="font-light text-sm">
            Posted by <span className="text-indigo-500 cursor-pointer">{post.creator.username}</span>
          </p>
          <div className="flex mt-4">
            <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
              {post.contentSnippet}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <hr className="ml-8 mt-3" />
      <div className="mt-2 flex ml-8">
        <div className="flex">
          {/* <div
            onClick={() => toast.error('This feature is yet being implemented!')}
            className="h-3.5 w-3.5 lg:h-4 lg:w-4 mr-3 hover:text-indigo-500 cursor-pointer"
          >
            <ReplyIcon />
          </div> */}
          <div
            onClick={async () => {
              await createBookmark({
                variables: { PostId: post.id },
                update: (cache) => updateAfterPost(!post.bookmarked, post.id, cache),
              });
            }}
            className="h-3.5 w-3.5 lg:h-4 lg:w-4 mr-3 hover:text-indigo-500 cursor-pointer"
          >
            {post.bookmarked ? <Bookmarked /> : <NotBookmarked />}
          </div>
          {/* <div
            onClick={() => toast.error('This feature is yet being implemented!')}
            className="h-3.5 w-3.5 lg:h-4 lg:w-4 hover:text-indigo-500 cursor-pointer"
          >
            <ShareIcon />
          </div> */}
        </div>
        {meData?.me?.id === post.creator.id && <EditDeletePostBtns id={post.id} />}
      </div>
    </div>
  );
};

export default Card;
