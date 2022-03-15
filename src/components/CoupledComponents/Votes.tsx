import { ApolloCache, ApolloError } from '@apollo/client';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { gql } from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { PostContentFragment, useVoteMutation, VoteMutation } from '../../generated/graphql';
import { selectGQLError } from '../../utils/selectGqlError';

interface UpvoteProps {
  post: PostContentFragment;
}

const updateAfterPost = (value: number, postId: string, cache: ApolloCache<VoteMutation>) => {
  const data = cache.readFragment<{ id: string; points: string; voteStatus: number }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints: number = parseInt(data.points) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: 'Post:' + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

const Votes: React.FC<UpvoteProps> = ({ post }) => {
  const [loading, setLoading] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading');
  const [vote] = useVoteMutation();
  const router = useRouter();

  const voteWithPoint = async (voteValue: number, loadingStatus: 'upvote-loading' | 'downvote-loading') => {
    try {
      if (post.voteStatus === voteValue) {
        return;
      }
      setLoading(loadingStatus);
      await vote({
        variables: { postId: post.id, value: voteValue },
        update: (cache) => updateAfterPost(voteValue, post.id, cache),
      });
      setLoading('not-loading');
    } catch (error) {
      setLoading('not-loading');
      if (error instanceof ApolloError) {
        const errCode = selectGQLError(error);
        if (errCode === 'NOT_AUTHORIZED') {
          router.replace('/login');
          toast.error("You're not authenticated! Please login.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-evenly mr-3 self-start mt-1">
      <div
        className={`cursor-pointer w-5 h-5 ${post.voteStatus === 1 ? 'text-indigo-500' : 'text-gray-800'}`}
        onClick={() => voteWithPoint(1, 'upvote-loading')}
      >
        <ArrowSmUpIcon />
      </div>
      {post.points}
      <div
        className={`cursor-pointer w-5 h-5 ${post.voteStatus === -1 ? 'text-rose-500' : 'text-gray-800'}`}
        onClick={() => voteWithPoint(-1, 'downvote-loading')}
      >
        <ArrowSmDownIcon />
      </div>
    </div>
  );
};

export default Votes;
