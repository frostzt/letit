import React, { Fragment } from 'react';

import NavBar from '../NavBar/NavBar';
import Wrapper, { WrapperVariantType } from '../Wrapper/Wrapper';

interface LayoutProps {
  children: React.ReactNode;
  variant?: WrapperVariantType;
}

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <Fragment>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </Fragment>
  );
};

export default Layout;
