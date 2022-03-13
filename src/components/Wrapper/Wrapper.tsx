import React from 'react';

export type WrapperVariantType = 'small' | 'regular';

interface WrapperProps {
  children: React.ReactNode;
  variant?: WrapperVariantType;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="w-5/6 px-3 sm:px-6 md:px-12 lg:px-48 ml-auto">{children}</div>;
};

export default Wrapper;
