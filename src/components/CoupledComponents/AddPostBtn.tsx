import { PlusSmIcon } from '@heroicons/react/outline';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const AddPostBtn: React.FC<{}> = () => {
  const { data, loading } = useMeQuery({ skip: isServer() });

  if (!data?.me) {
    return null;
  }

  return (
    <div className="fixed -bottom-7 -right-7 hd:-bottom-9 hd:-right-9 bg-indigo-500 p-5 rounded-full">
      <NextLink href="/create-post">
        <div className="w-6 h-6 hd:w-12 hd:h-12 hd:p-2 text-indigo-50 -translate-x-2.5 -translate-y-2.5 hd:-translate-x-3 hd:-translate-y-3 cursor-pointer">
          <PlusSmIcon />
        </div>
      </NextLink>
    </div>
  );
};

export default AddPostBtn;
