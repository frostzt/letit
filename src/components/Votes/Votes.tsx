import { ApolloCache, ApolloError } from '@apollo/client';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
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

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" mr={6}>
      <IconButton
        onClick={async () => {
          try {
            if (post.voteStatus === 1) {
              return;
            }
            setLoading('upvote-loading');
            await vote({
              variables: { postId: post.id, value: 1 },
              update: (cache) => updateAfterPost(1, post.id, cache),
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
        }}
        isLoading={loading === 'upvote-loading'}
        colorScheme={post.voteStatus === 1 ? 'green' : 'blackAlpha'}
        icon={<ChevronUpIcon />}
        aria-label="Upvote"
      />
      {post.points}
      <IconButton
        onClick={async () => {
          try {
            if (post.voteStatus === -1) {
              return;
            }
            setLoading('downvote-loading');
            await vote({
              variables: { postId: post.id, value: -1 },
              update: (cache) => updateAfterPost(-1, post.id, cache),
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
        }}
        colorScheme={post.voteStatus === -1 ? 'red' : 'blackAlpha'}
        isLoading={loading === 'downvote-loading'}
        icon={<ChevronDownIcon />}
        aria-label="Downvote"
      />
    </Flex>
  );
};

export default Votes;
