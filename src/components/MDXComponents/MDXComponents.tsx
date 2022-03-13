import React from 'react';

const MarkdownComponents = {
  h1: (props: React.ComponentProps<'h1'>) => <h1 className="font-bold text-4xl" {...props} />,
  h2: (props: React.ComponentProps<'h2'>) => <h2 className="font-semibold text-xl" {...props} />,
  h3: (props: React.ComponentProps<'h3'>) => <h3 className="font-medium" {...props} />,
  h4: (props: React.ComponentProps<'h4'>) => <h4 className="font-medium" {...props} />,
  h5: (props: React.ComponentProps<'h5'>) => <h5 className="font-medium" {...props} />,
  h6: (props: React.ComponentProps<'h6'>) => <h6 className="font-medium" {...props} />,
  a: (props: React.ComponentProps<'a'>) => <a className="text-rose-500" {...props} />,
};

export { MarkdownComponents };
