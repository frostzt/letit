import { ReplyIcon, ShareIcon } from '@heroicons/react/outline';
import NextLink from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EditDeletePostBtns from '../components/EditDeletePostBtns/EditDeletePostBtns';
import { MarkdownComponents } from '../components/MDXComponents/MDXComponents';
import Votes from '../components/Votes/Votes';
import { MeQuery, PostContentFragment } from '../generated/graphql';

interface CardProps {
  post: PostContentFragment;
  meData: MeQuery | undefined;
}

const Card: React.FC<CardProps> = ({ post, meData }) => {
  return (
    <div
      key={post.id}
      className="flex flex-col bg-white p-5 shadow-lg shadow-zinc-300/50 border-1 mb-4 md:mb-8 rounded-md hd:p-8"
    >
      <div className="flex">
        <Votes post={post} />
        <div className="flex flex-col">
          <NextLink href="/post/[id]" as={`/post/${post.id}`}>
            <h2 className="text-lg font-bold">{post.title}</h2>
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
          <div className="h-3.5 w-3.5 lg:h-4 lg:w-4 mr-3 hover:text-indigo-500">
            <ReplyIcon />
          </div>
          <div className="h-3.5 w-3.5 lg:h-4 lg:w-4 hover:text-indigo-500">
            <ShareIcon />
          </div>
        </div>
        {meData?.me?.id === post.creator.id && <EditDeletePostBtns id={post.id} />}
      </div>
    </div>
  );
};

export default Card;
