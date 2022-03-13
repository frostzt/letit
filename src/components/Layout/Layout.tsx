import React from 'react';
import NavBar from '../NavBar/NavBar';
import Wrapper, { WrapperVariantType } from '../Wrapper/Wrapper';

interface LayoutProps {
  children: React.ReactNode;
  variant?: WrapperVariantType;
}

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <main>
      <NavBar />
      <Wrapper variant={variant}>
        <div className="mt-5 col-start-2 col-end-3">{children}</div>
      </Wrapper>
    </main>
  );
};

export default Layout;
