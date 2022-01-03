import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostContentFragment, useVoteMutation } from '../../generated/graphql';

interface UpvoteProps {
  post: PostContentFragment;
}

const Votes: React.FC<UpvoteProps> = ({ post }) => {
  const [loading, setLoading] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading');
  const [, vote] = useVoteMutation();

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" mr={6}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoading('upvote-loading');
          await vote({ postId: post.id, value: 1 });
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
          await vote({ postId: post.id, value: -1 });
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
