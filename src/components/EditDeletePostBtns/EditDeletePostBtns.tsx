import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useDeletePostMutation } from '../../generated/graphql';

interface EditDeletePostBtnsProps {
  id: string;
}

const EditDeletePostBtns: React.FC<EditDeletePostBtnsProps> = ({ id }) => {
  const [, deletePost] = useDeletePostMutation();

  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} colorScheme="blackAlpha" icon={<EditIcon />} mr={4} aria-label="Edit Post" />
      </NextLink>
      <IconButton
        onClick={() => {
          deletePost({ id: id });
        }}
        colorScheme="blackAlpha"
        icon={<DeleteIcon />}
        aria-label="Delete Post"
      />
    </Box>
  );
};

export default EditDeletePostBtns;
