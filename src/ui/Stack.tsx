import React from 'react';

interface StackProps {}

const Stack: React.FC<StackProps> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

export default Stack;
