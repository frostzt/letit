import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const SideBar: React.FC<{}> = () => {
  const isLaptopLarge = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="flex flex-col p-1 top-0 w-1/6 h-screen z-50 bg-zinc-900 fixed justify-between">
      <div className="mx-auto">
        <NextLink href="/">
          <div className="flex justify-center ml-1 mt-2 md:mt-5 items-center lg:items-end cursor-pointer">
            <div className="relative h-10 w-10 hd:h-12 hd:w-12">
              <Image src="/icon.svg" alt="Letit" layout="fill" priority />
            </div>
            {isLaptopLarge ? (
              <h2 className="text-indigo-50 ml-3 font-bold text-2xl hd:text-3xl">
                Let<span className="text-indigo-500">it</span>
              </h2>
            ) : null}
          </div>
        </NextLink>
      </div>
    </div>
  );
};

export default SideBar;
