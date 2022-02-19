import { ApolloCache } from '@apollo/client';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import { gql } from 'graphql-tag';
import React, { useState } from 'react';
import { PostContentFragment, useVoteMutation, VoteMutation } from '../../generated/graphql';

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

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" mr={6}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoading('upvote-loading');
          await vote({
            variables: { postId: post.id, value: 1 },
            update: (cache) => updateAfterPost(1, post.id, cache),
          });
          setLoading('not-loading');
        }}
        isLoading={loading === 'upvote-loading'}
        colorScheme={post.voteStatus === 1 ? 'green' : 'blackAlpha'}
        icon={<ChevronUpIcon />}
        aria-label="Upvote"
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoading('downvote-loading');
          await vote({
            variables: { postId: post.id, value: -1 },
            update: (cache) => updateAfterPost(-1, post.id, cache),
          });
          setLoading('not-loading');
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
