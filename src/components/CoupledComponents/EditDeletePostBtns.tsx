import NextLink from 'next/link';
import { TrashIcon, PencilIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDeletePostMutation } from '../../generated/graphql';

interface EditDeletePostBtnsProps {
  id: string;
}

const EditDeletePostBtns: React.FC<EditDeletePostBtnsProps> = ({ id }) => {
  const [deletePost] = useDeletePostMutation();

  return (
    <div className="ml-auto flex">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <div className="text-gray-900 cursor-pointer mr-3 w-3.5 h-3.5 lg:w-4 lg:h-4 hd:w-5 hd:h-5">
          <PencilIcon />
        </div>
      </NextLink>
      <div
        className="text-rose-500 cursor-pointer w-3.5 h-3.5 lg:w-4 lg:h-4 hd:w-5 hd:h-5"
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: 'Post:' + id });
            },
          });
        }}
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default EditDeletePostBtns;
